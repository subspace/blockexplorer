/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient } from 'graphql-request';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';

import { queryBalance, querySquidHeight } from './queries';
import { submitTxAndWaitForBlockHash, wait } from './utils';

dotenv.config();

const keyring = new Keyring({ type: 'sr25519', ss58Format: 2254 });
const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT as string);
const squidClient = new GraphQLClient(process.env.SQUID_GRAPHQL_ENDPOINT as string);

let rpcApi: ApiPromise;
let ALICE: KeyringPair | undefined;
let BOB: KeyringPair | undefined;
const AMOUNT = 10n ** 18n;

interface AccountBalance {
  total: number;
  free: number;
  reserved: number;
  updatedAt: number;
}

tap.before(async () => {
  rpcApi = await ApiPromise.create({ provider: wsProvider });

  // assign account keypairs
  ALICE = keyring.addFromUri('//Alice');
  BOB = keyring.addFromUri('//Bob');

  // send inial transfer from Alice to Bob to trigger squid indexing of ALICE and BOB accounts
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE, BOB.address, AMOUNT);
  const txBlockNumber = (await rpcApi.rpc.chain.getHeader(blockHash)).number.toNumber();

  // wait for the block to be processed by the squid
  for (; ;) {
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight)).squidStatus;
    console.log(`Waiting for the squid to catch up... ${squidHeight}/${txBlockNumber}`);
    if (squidHeight >= txBlockNumber) break;
    await wait(1000);
  }
});

tap.teardown(async () => {
  await rpcApi.disconnect();
});

tap.test('account balances should update after transfer', async (t) => {
  // get initial account balances from the squid
  const { free: initAliceSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE!.address })).accountById;
  const { free: initBobSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB!.address })).accountById;

  // send a transfer from Alice to Bob
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE!, BOB!.address, AMOUNT);
  const txBlockNumber = (await rpcApi.rpc.chain.getHeader(blockHash)).number.toNumber();

  // wait for the block to be processed by the squid
  for (; ;) {
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight)).squidStatus;
    console.log(`Waiting for the squid to catch up... ${squidHeight}/${txBlockNumber}`);
    if (squidHeight >= txBlockNumber) break;
    await wait(1000);
  }

  // get updated account balances from the squid
  const { free: postAliceSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE!.address })).accountById;
  const { free: postBobSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB!.address })).accountById;

  // check that the balances are updated correctly
  t.equal(BigInt(initAliceSquidBalance - postAliceSquidBalance), AMOUNT);
  t.equal(BigInt(postBobSquidBalance - initBobSquidBalance), AMOUNT);
});
