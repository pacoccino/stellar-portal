import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';
import { AssetInstance, REFRESH_INTERVAL } from './StellarTools';

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
export const OrderbookStream = ({ selling, buying }, onmessage) => {
  return getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .stream({ onmessage });
};
export const OrderbookDetail = ({ selling, buying }) => {
  debugger;
  return getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .trades()
    .call();
};

export const OffersStream = (accountId, callback) => {
  const timerId = setInterval(() => {
    getServerInstance()
      .offers('accounts', accountId)
      .order('desc')
      .call()
      .then(result => callback(result.records));
  }, REFRESH_INTERVAL);

  return () => clearInterval(timerId);
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

export async function generateTestPair(){
  const pair = Stellar.Keypair.random();

  try {
    await fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${pair.accountId()}`);
    return pair;
  } catch(e) {
    throw e;
  }
}

switchNetwork();
