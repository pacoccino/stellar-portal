import { isString, isNumber } from 'lodash';
import StellarSDK from 'stellar-sdk';

import * as Stellar from './StellarServer';
import { AssetInstance, KeypairInstance, AmountInstance } from './StellarTools';

export const sendTransaction = (authData, { operations = null, operation = null }) => {
  const keypair = KeypairInstance(authData.keypair);
  const sourceAccount = authData.sourceAccount;
  const sourceAddress = keypair.accountId();
  const sequenceNumber = sourceAccount.sequence;
  const transAccount = new StellarSDK.Account(sourceAddress, sequenceNumber);

  const transactionBuilder = new StellarSDK.TransactionBuilder(transAccount);
  [operation].concat(operations).filter(o => !!o).forEach(op => transactionBuilder.addOperation(op));

  const transaction = transactionBuilder.build();
  transaction.sign(keypair);

  return Stellar.getServerInstance().submitTransaction(transaction);
};

export const sendPayment = ({ asset, destination, amount }, authData) => {
  const operation = StellarSDK.Operation.payment({
    destination: destination,
    asset: AssetInstance(asset),
    amount: AmountInstance(amount),
  });

  return sendTransaction(authData, { operation });
};

export const sendPathPayment = ({ asset_source, asset_destination, amount_destination, destination, max_amount }, authData) => {
  const operation = StellarSDK.Operation.pathPayment({
    sendAsset:    AssetInstance(asset_source),
    sendMax:      AmountInstance(max_amount),
    destination:  destination,
    destAsset:    AssetInstance(asset_destination),
    destAmount:   AmountInstance(amount_destination),
  });

  return sendTransaction(authData, { operation });
};

export const changeTrust = ({ asset, limit }, authData) => {
  const trustLimit = (isNumber(limit) || isString(limit)) ? AmountInstance(limit) : undefined;
  const operation = StellarSDK.Operation.changeTrust({
    asset: AssetInstance(asset),
    limit: trustLimit,
  });

  return sendTransaction(authData, { operation });
};

export const manageOffer = ({ selling, buying, amount, price, passive, id }, authData) => {

  const operations = [];

  const offerId = isNumber(id) ? id : 0;
  const offer = {
    selling: AssetInstance(selling),
    buying: AssetInstance(buying),
    amount: AmountInstance(amount),
    price: AmountInstance(price),
    offerId,
  };
  if(passive) {
    operations.push(StellarSDK.Operation.createPassiveOffer(offer));
  } else {
    operations.push(StellarSDK.Operation.manageOffer(offer));
  }

  return sendTransaction(authData, { operations });
};

export const createAccount = ({ destination, amount }, authData) => {
  const operation = StellarSDK.Operation.createAccount({
    destination,
    startingBalance: amount,
  });

  return sendTransaction(authData, { operation });
};

export const accountMerge = ({ destination }, authData) => {
  const operation = StellarSDK.Operation.accountMerge({
    destination,
  });

  return sendTransaction(authData, { operation });
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