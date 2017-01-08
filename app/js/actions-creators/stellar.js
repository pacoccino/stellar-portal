import * as StellarHelper from '../helpers/Stellar';

import * as AccountActions from '../actions/account';
import { getKeypair, getAccount } from '../helpers/selector';

const prepareTransaction = (state, dispatch) => {
  const keypair = getKeypair(state);
  const sourceAccount = getAccount(state);

  if (!keypair || !sourceAccount) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account not set")));
    return null;
  }
  if (!keypair.canSign()) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account seed not set")));
    return null;
  }
  return {
    keypair,
    sourceAccount,
  };
};

export const sendPayment = formData => (dispatch, getState) => {
  dispatch(AccountActions.sendingPayment());

  const basicData = prepareTransaction(getState(), dispatch);
  if(!basicData) return;

  const { asset, amount, destination, asset_destination, amount_destination } = formData;

  const paymentData = {
    ...basicData,
    asset,
    amount,
    destination,
    asset_destination,
    amount_destination
  };

  let promise = null;
  if(asset_destination && amount_destination) {
    promise = StellarHelper.sendPathPayment(paymentData);
  } else {
    promise = StellarHelper.sendPayment(paymentData);
  }

  return promise
    .catch(error =>
      dispatch(AccountActions.sendPaymentError(error))
    )
    .then(d => {
      dispatch(AccountActions.sendPaymentSuccess(d));
    });
};

const changeTrust = ({ asset, limit }) => (dispatch, getState) => {

  const basicData = prepareTransaction(getState(), dispatch);
  if(!basicData) return;

  const transactionData = {
    ...basicData,
    asset,
    limit,
  };

  return StellarHelper
    .changeTrust(transactionData); // TODO receive
};

export const createTrustline = asset => (
  changeTrust({
    asset,
    limit: null,
  })
);
export const deleteTrustline = asset => (
  changeTrust({
    asset,
    limit: "0",
  })
);

export const createOffer = ({ selling,  buying,  amount,  price, passive }) => (dispatch, getState) => {

  const basicData = prepareTransaction(getState(), dispatch);
  if(!basicData) return;

  const transactionData = {
    ...basicData,
    selling,
    buying,
    amount,
    price,
    passive,
  };

  return StellarHelper
    .createOffer(transactionData); // TODO receive
};
