import Stellar from 'stellar-sdk';

// import StellarOffline from './StellarOffline';
import { augmentAccount, AssetInstance, REFRESH_INTERVAL } from './StellarTools';

let Server;

function traceError() {
  // console.error(e);
}
export const getServerInstance = () => Server;
// if(process.env.NODE_ENV !== 'production') {
//   return StellarOffline();
// }

export const getAccount = accountId =>
  getServerInstance()
    .loadAccount(accountId)
    .then((account) => {
      if (account) {
        return augmentAccount(account);
      }
      throw 'no account';
    });

export const Orderbook = ({ selling, buying }) =>
  getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .call();
export const OrderbookStream = ({ selling, buying }, onmessage) =>
  getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .stream({ onmessage });

export const OrderbookDetail = ({ selling, buying }) =>
  getServerInstance()
    .orderbook(AssetInstance(selling), AssetInstance(buying))
    .trades()
    .call();

export const AccountStream = (accountId, callback) =>
  getServerInstance()
    .accounts()
    .accountId(accountId)
    .stream({
      onmessage: (streamAccount) => {
        callback(augmentAccount(streamAccount));
      },
      onerror: traceError,
    });

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

export const EffectsStream = (accountId, onmessage) =>
  getServerInstance()
    .effects()
    .forAccount(accountId)
    .order('asc')
    .stream({ onmessage });

export const PaymentStream = (accountId, onmessage) =>
  getServerInstance()
    .payments()
    .forAccount(accountId)
    .order('asc')
    .stream({
      onmessage: (payment) => {
        payment.transaction().then((transaction) => {
          onmessage({
            ...payment,
            transaction,
          });
        });
      },
      onerror: traceError,
    });

export const switchNetwork = (network) => {
  switch (network) {
    case 'perso':
      Server = new Stellar.Server('http://192.168.1.67:8000', { allowHttp: true });
      Stellar.Network.useTestNetwork();
      break;
    case 'public':
      Server = new Stellar.Server('https://horizon.stellar.org');
      Stellar.Network.usePublicNetwork();
      break;
    default:
    case 'test':
      Server = new Stellar.Server('https://horizon-testnet.stellar.org');
      Stellar.Network.useTestNetwork();
      break;
  }
};

export async function generateTestPair() {
  const pair = Stellar.Keypair.random();

  try {
    await fetch(`https://horizon-testnet.stellar.org/friendbot?addr=${pair.publicKey()}`);
    return pair;
  } catch (e) {
    throw e;
  }
}

switchNetwork();
