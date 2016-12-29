import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';

const Server = new Stellar.Server('https://horizon-testnet.stellar.org');

const nativeAsset = Stellar.Asset.native();

export const getServerInstance = () => {
  if(process.env.NODE_ENV === 'production') {
    return Server;
  }
  return new StellarOffline();
}

export const getAccount = (accountId) => {
  return getServerInstance()
    .loadAccount(accountId)
    .call();
};
export const getAccountStream = (accountId, onmessage) => {
  return getServerInstance()
    .loadAccount(accountId)
    .stream({ onmessage });
};

export const getTransactions = (accountId) => {
  return getServerInstance().transactions()
    .forAccount(accountId)
    .call();
};
export const getTransactionsStream = (accountId, onmessage) => {
  return getServerInstance().transactions()
    .forAccount(accountId)
    .stream({ onmessage });
};

export const sendPayment = ({ keypair, sourceAccount, destination, amount }) => {
  const sequenceNumber = sourceAccount.sequenceNumber();
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);

  const transaction = new Stellar.TransactionBuilder(transAccount)
    .addOperation(Stellar.Operation.payment({
      destination: destination,
      asset: nativeAsset,
      amount: amount
    }))
    .build();

  transaction.sign(keypair);

  return getServerInstance()
    .submitTransaction(transaction)
    .then(d => {
      sourceAccount.incrementSequenceNumber();
      return d;
    });
};


export const validPk = pk => {
  return Stellar.Keypair.isValidPublicKey(pk);
};
export const validSeed = pk => {
  return Stellar.Keypair.isValidPublicKey(pk);
};

/*
Endpoints

accounts
effects
ledgers
loadAccount
offers
operations
orderbook
paths
payments
transactions

Retrieval
call
stream({onmessage})

Filter
limit
order
cursor
forAccount
forLedger
forTransaction
 */