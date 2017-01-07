import Stellar from 'stellar-sdk';

import * as StellarHelper from '../helpers/Stellar';

import * as AccountActions from '../actions/account';
import { getKeypair, getAccount } from '../selectors/selector';

export const sendPayment = formData => (dispatch, getState) => {
  dispatch(AccountActions.sendingPayment());

  const state = getState();
  const { keypair } = getKeypair(state);
  const sourceAccount = getAccount(state);

  if(!keypair || !sourceAccount) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account not set")));
  }
  if(!keypair.canSign()) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account seed not set")));
  }

  const paymentData = Object.assign({}, formData, {
    keypair,
    sourceAccount,
  });

  return StellarHelper
    .sendPayment(paymentData)
    .catch(error =>
      dispatch(AccountActions.sendPaymentError(error))
    )
    .then(d => {
      dispatch(AccountActions.sendPaymentSuccess(d));
    });
};

export const changeTrust = ({ asset, amount }) => (dispatch, getState) => {
  // dispatch(AccountActions.sendingPayment());

  const state = getState();
  const keypair = getKeypair(state);
  const sourceAccount = getAccount(state);

  if (!keypair || !sourceAccount) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account not set")));
    return;
  }
  if (!keypair.canSign()) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account seed not set")));
    return;
  }

  const paymentData = {
    keypair,
    sourceAccount,
    asset,
    amount,
  };

  return StellarHelper
    .changeTrust(paymentData)
    .catch(error =>
      dispatch(AccountActions.sendPaymentError(error))
    )
    .then(d => {
      dispatch(AccountActions.sendPaymentSuccess(d));
    });
};

export const deleteTrustline = asset => (
  changeTrust({
    asset,
    amount: "0",
  })
);
