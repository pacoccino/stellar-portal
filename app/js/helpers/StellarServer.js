import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';
import { AssetInstance } from './StellarTools';

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

export const Orderbook = ({ selling, buying }) => {
  return getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .call();
};
export const OrderbookDetail = ({ selling, buying }) => {
  debugger;
  return getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .trades()
    .call();
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
