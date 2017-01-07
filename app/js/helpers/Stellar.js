import { isString } from 'lodash';
import Stellar from 'stellar-sdk';

import StellarOffline from './StellarOffline';

const Server = new Stellar.Server('https://horizon-testnet.stellar.org');

const nativeAsset = Stellar.Asset.native();

export const getServerInstance = () => {
  if(false && process.env.NODE_ENV !== 'production') {
    return StellarOffline();
  }

  return Server;
}

export const getAccount = (accountId) => {
  return getServerInstance()
    .loadAccount(accountId);
};
export const getAccountStream = (accountId, onmessage) => {
  return getServerInstance()
    .accounts()
    .accountId(accountId)
    .stream({ onmessage });
};

export const getPayments = (accountId) => {
  return getServerInstance().payments()
    .forAccount(accountId)
    .call();
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

export const sendPayment = ({ asset, keypair, sourceAccount, destination, amount }) => {
  const sequenceNumber = sourceAccount.sequence;
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);

  const transaction = new Stellar.TransactionBuilder(transAccount)
    .addOperation(Stellar.Operation.payment({
      destination: destination,
      asset: asset,
      amount: amount
    }))
    .build();

  transaction.sign(keypair);

  return getServerInstance()
    .submitTransaction(transaction);
};

export const changeTrust = ({ asset, amount, keypair, sourceAccount }) => {
  const sequenceNumber = sourceAccount.sequence;
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);
  const limit = isString(amount) ? amount : null;

  const transaction = new Stellar.TransactionBuilder(transAccount)
    .addOperation(Stellar.Operation.changeTrust({
      asset,
      limit,
    }))
    .build();

  transaction.sign(keypair);

  return getServerInstance()
    .submitTransaction(transaction);
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