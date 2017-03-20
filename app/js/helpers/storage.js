import { isArray } from 'lodash';

import { KeypairInstance } from './StellarTools';

export const ACCOUNTS_KEY = 'accounts';

const deserializeAccount = account => ({
  ...account,
  keypair: KeypairInstance({
    publicKey: account.keypair.publicKey,
    //secretSeed: decrypt(account.keypair.secretSeed),
  }),
});

const serializeAccount = account => ({
  ...account,
  keypair: {
    publicKey: account.keypair.publicKey(),
    //secretSeed: encrypt(account.keypair.secretSeed()),
  },
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

export const addLocalAccount = (account) => {
  try {
    let accounts = getLocalAccounts();
    if (!isArray(accounts)) {
      accounts = [];
    }

    const localAccountIndex = accounts.findIndex(a => a.id === account.id);
    if (localAccountIndex !== -1) {
      accounts[localAccountIndex] = account;
    } else {
      accounts.push(account);
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
