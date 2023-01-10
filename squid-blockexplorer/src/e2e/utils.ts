import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Hash } from '@polkadot/types/interfaces/runtime';

export function snakeToCamel(str: string) {
  return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

export function submitTxAndWaitForBlockHash(api: ApiPromise, from: KeyringPair, to: string, amount: number) {
  return new Promise<Hash>((resolve) => {
    api.tx.balances
      .transfer(to, amount)
      .signAndSend(from, (result) => {
        console.log(`Current status is ${result.status}`);

        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
          resolve(result.status.asInBlock);
        }
      });
  });
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
