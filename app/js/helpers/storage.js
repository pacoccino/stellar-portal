import { isArray } from 'lodash';

import { KeypairInstance } from './StellarTools';

export const ACCOUNTS_KEY = 'accounts';

const deserializeAccount = account => KeypairInstance({
  publicKey: account.publicKey,
  //secretSeed: decrypt(account.secretSeed),
});
const serializeAccount = account => ({
  publicKey: account.publicKey(),
  //secretSeed: encrypt(account.secretSeed()),
});

export const getLocalAccounts = () => {
  try {
    const rawAccountsData = localStorage.getItem(ACCOUNTS_KEY);
    const accountsData = JSON.parse(rawAccountsData);

    if (!isArray(accountsData)) {
      throw new Error();
    }

    return accountsData.map(deserializeAccount);
  } catch (e) {
    console.error('Invalid local user accounts data', e);
    return [];
  }
};

export const addLocalAccount = (keypair) => {
  try {
    let accounts = getLocalAccounts();
    if (!isArray(accounts)) {
      accounts = [];
    }
    const localAccountIndex = accounts.findIndex(a =>
      (a.publicKey() === keypair.publicKey()),
    );
    if (localAccountIndex !== -1) {
      accounts[localAccountIndex] = keypair;
    } else {
      accounts.push(keypair);
    }

    const serializedAccounts = accounts.map(serializeAccount);
    const jsonAccounts = JSON.stringify(serializedAccounts);
    localStorage.setItem(ACCOUNTS_KEY, jsonAccounts);
    return accounts;
  } catch (e) {
    console.error('Error while saving account');
    return [];
  }
};
