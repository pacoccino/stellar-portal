import { isString, isNumber, isFunction } from 'lodash';
import { Account, Memo, Operation, TransactionBuilder } from 'stellar-sdk';

import * as Stellar from './StellarServer';
import { AssetInstance, KeypairInstance, AmountInstance } from './StellarTools';

/**
 * Add a list of operations to a transaction builder
 *
 * @param transactionBuilder {TransactionBuilder} - from stellar SDK
 * @param operations {Operation[]} List of operations
 * @param operation {Object} One operation
 */
const addOperations = (transactionBuilder, { operations = [], operation = null }) => {
  [operation].concat(operations)
    .filter(o => !!o)
    .forEach(op => transactionBuilder.addOperation(op));
};

/**
 * Add a memo to a transaction
 *
 * @param transactionBuilder {TransactionBuilder} - from stellar SDK
 * @param memo {Object}
 * @param memo.type {String} One of Stellar.Memo static methods
 * @param memo.value {String} Memo value
 */
const addMemo = (transactionBuilder, memo) => {
  if (!transactionBuilder || !memo) return;

  const { type, value } = memo;
  let xdrMemo;

  if (isFunction(Memo[type])) {
    xdrMemo = Memo[type](value);
  }
  if (xdrMemo) {
    transactionBuilder.addMemo(xdrMemo);
  }
};

/**
 * Build and send a transacton
 *
 * @param authData {Object} Source account and signers data
 * @param authData.keypair {Keypair} keypair of sender and signer
 * @param authData.sourceAccount {Account} Account of sender
 * @param operations {Operation[]}
 * @param operation {Operation}
 * @param memo {Object}
 * @returns {Promise}
 */
export const sendTransaction = (authData, { operations, operation, memo }) => {
  const keypair = KeypairInstance(authData.keypair);
  const sourceAccount = authData.sourceAccount;
  const sourceAddress = keypair.publicKey();
  const sequenceNumber = sourceAccount.sequence;
  const transAccount = new Account(sourceAddress, sequenceNumber);

  const transactionBuilder = new TransactionBuilder(transAccount);

  addOperations(transactionBuilder, { operations, operation });
  addMemo(transactionBuilder, memo);

  const transaction = transactionBuilder.build();
  transaction.sign(keypair);

  return Stellar.getServerInstance().submitTransaction(transaction);
};

export const sendPayment = ({ asset, destination, amount, memo }, authData) => {
  try {
    const operation = Operation.payment({
      destination,
      asset: AssetInstance(asset),
      amount: AmountInstance(amount),
    });
    return sendTransaction(authData, { operation, memo });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const sendPathPayment = ({
  asset_source,
  asset_destination,
  amount_destination,
  destination,
  max_amount,
  memo,
}, authData) => {
  try {
    const operation = Operation.pathPayment({
      sendAsset: AssetInstance(asset_source),
      sendMax: AmountInstance(max_amount),
      destination,
      destAsset: AssetInstance(asset_destination),
      destAmount: AmountInstance(amount_destination),
    });
    return sendTransaction(authData, { operation, memo });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const changeTrust = ({ asset, limit }, authData) => {
  try {
    const trustLimit = (isNumber(limit) || isString(limit)) ? AmountInstance(limit) : undefined;
    const operation = Operation.changeTrust({
      asset: AssetInstance(asset),
      limit: trustLimit,
    });

    return sendTransaction(authData, { operation });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const manageOffer = ({ selling, buying, amount, price, passive, id }, authData) => {
  try {
    const operations = [];

    const offerId = isNumber(id) ? id : 0;
    const offer = {
      selling: AssetInstance(selling),
      buying: AssetInstance(buying),
      amount: AmountInstance(amount),
      price: AmountInstance(price),
      offerId,
    };
    if (passive) {
      operations.push(Operation.createPassiveOffer(offer));
    } else {
      operations.push(Operation.manageOffer(offer));
    }

    return sendTransaction(authData, { operations });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createAccount = ({ destination, amount }, authData) => {
  try {
    const operation = Operation.createAccount({
      destination,
      startingBalance: amount,
    });

    return sendTransaction(authData, { operation });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const accountMerge = ({ destination }, authData) => {
  try {
    const operation = Operation.accountMerge({
      destination,
    });

    return sendTransaction(authData, { operation });
  } catch (e) {
    return Promise.reject(e);
  }
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
