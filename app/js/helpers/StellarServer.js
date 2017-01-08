import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';

let Server;

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

export const switchNetwork = (network) => {
  switch(network) {
    case 'public':
      Server = new Stellar.Server('https://horizon.stellar.org');
      break;
    default:
    case 'test':
      Server = new Stellar.Server('https://horizon-testnet.stellar.org');
      break;
  }
};

switchNetwork();
