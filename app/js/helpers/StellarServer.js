import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';

const Server = new Stellar.Server('https://horizon-testnet.stellar.org');

export const getServerInstance = () => {
  if(false && process.env.NODE_ENV !== 'production') {
    return StellarOffline();
  }

  return Server;
};

export const getAccount = (accountId) => {
  return getServerInstance()
    .loadAccount(accountId);
};
