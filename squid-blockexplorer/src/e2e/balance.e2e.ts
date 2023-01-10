import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient } from 'graphql-request';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

import { queryBalance, querySquidHeight } from './queries';
import { submitTxAndWaitForBlockHash, wait } from './utils';

dotenv.config();

const keyring = new Keyring({ type: 'sr25519' });
const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT as string);
const squidClient = new GraphQLClient(process.env.SQUID_GRAPHQL_ENDPOINT as string);

let rpcApi: ApiPromise;

interface AccountBalance {
  total: number;
  free: number;
  reserved: number;
  updatedAt: number;
}

tap.before(async () => {
  rpcApi = await ApiPromise.create({ provider: wsProvider });
});

tap.teardown(async () => {
  await rpcApi.disconnect();
});

tap.test('account balances should update', async (t) => {
  // get account keypairs
  const ALICE = keyring.addFromUri('//Alice');
  const BOB = keyring.addFromUri('//Bob');

  // get initial account balances from the squid
  const initAliceBalance: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE.address })).accountById;
  const initBobBalance: AccountBalance = (await squidClient.request(queryBalance, { id: BOB.address })).accountById;

  console.log('aliceBalance', initAliceBalance);
  console.log('initBobBalance', initBobBalance);

  // send a transfer from Alice to Bob
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE, BOB.address, 1000);

  // wait for the block to be processed by the squid
  for (; ;) {
    const { number } = await rpcApi.rpc.chain.getHeader(blockHash);
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight)).squidStatus;
    console.log({ squidHeight, number: number.toNumber() });
    if (squidHeight >= number.toNumber()) break;

    await wait(1000);
  }

  // get updated account balances from the squid
  const postAliceBalance: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE.address })).accountById;
  const postBobBalance: AccountBalance = (await squidClient.request(queryBalance, { id: BOB.address })).accountById;

  console.log('postAliceBalance', postAliceBalance);
  console.log('postBobBalance', postBobBalance);
});

