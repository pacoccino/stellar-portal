import { isString } from 'lodash';
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

export const sendPathPayment = ({ asset, keypair, asset_destination, amount_destination, sourceAccount, destination, amount }) => {
  const sequenceNumber = sourceAccount.sequence;
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);

  const transaction = new Stellar.TransactionBuilder(transAccount)
    .addOperation(Stellar.Operation.pathPayment({
      sendAsset:    asset,
      sendMax:      amount,
      destination:  destination,
      destAsset:    asset_destination,
      destAmount:   amount_destination,
    }))
    .build();

  transaction.sign(keypair);

  return getServerInstance()
    .submitTransaction(transaction);
};

export const changeTrust = ({ asset, limit, keypair, sourceAccount }) => {
  const sequenceNumber = sourceAccount.sequence;
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);
  const trustLimit = isString(limit) ? limit : undefined;

  const transaction = new Stellar.TransactionBuilder(transAccount)
    .addOperation(Stellar.Operation.changeTrust({
      asset,
      limit: trustLimit,
    }))
    .build();

  transaction.sign(keypair);

  return getServerInstance()
    .submitTransaction(transaction);
};

export const createOffer = ({ selling, buying, amount, price, passive, keypair, sourceAccount }) => {
  const sequenceNumber = sourceAccount.sequence;
  const sourceAddress = keypair.accountId();
  const transAccount = new Stellar.Account(sourceAddress, sequenceNumber);

  const offer = {
    selling,
    buying,
    amount,
    price,
    offerId:  0
  };

  let transactionBuilder = new Stellar.TransactionBuilder(transAccount);
  if(passive) {
    transactionBuilder.addOperation(Stellar.Operation.createPassiveOffer(offer));
  } else {
    transactionBuilder.addOperation(Stellar.Operation.manageOffer(offer));
  }
  const transaction = transactionBuilder.build();
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