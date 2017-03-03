import { isArray } from 'lodash';

import { manageData } from './StellarOperations';
import { KeypairInstance } from './StellarTools';

const encrypt = a => a;
const decrypt = a => a;

export const ACCOUNTS_KEY = 'accounts';
export const PASSWORD_FIELD = 'password';

const deserializeAccount = account => KeypairInstance({
  publicKey: account.publicKey,
  //secretSeed: decrypt(account.secretSeed),
});
const serializeAccount = account => ({
  publicKey: account.publicKey(),
  //secretSeed: encrypt(account.secretSeed()),
});

export const getAccountSeed = (account, password) =>
  decrypt(account.data[PASSWORD_FIELD], password);

export const setAccountSeed = (authData, password) => {
  const encryptedSeed = encrypt(authData.keypair.secret(), password);
  const data = {
    PASSWORD_FIELD: encryptedSeed,
  };
  return manageData(data, authData);
};

export const getLocalAccounts = () => {
  try {
    const rawAccountsData = localStorage.getItem(ACCOUNTS_KEY);
    const accountsData = JSON.parse(rawAccountsData);

    if (!isArray(accountsData)) {
      throw new Error();
    }

    return accountsData.map(deserializeAccount);
  } catch (e) {
    console.error('Invalid local user accounts data');
    return [];
  }
};

export const addLocalAccount = (account) => {
  try {
    let accounts = getLocalAccounts();
    if (!isArray(accounts)) {
      accounts = [];
    }
    const localAccountIndex = accounts.findIndex(a =>
      (a.publicKey() === account.publicKey()),
    );
    const serializedAccount = serializeAccount(account);

    if (localAccountIndex) {
      accounts[localAccountIndex] = serializedAccount;
    } else {
      accounts.push(serializedAccount);
    }

    localStorage.setItem(ACCOUNTS_KEY, accounts);
    return accounts;
  } catch (e) {
    console.error('Error while saving account');
    return [];
  }
};
