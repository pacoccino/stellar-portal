import Stellar from 'stellar-sdk';

import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';

export const getAccount = keys => dispatch => {
  dispatch(fetchingAccount());

  const keypair = keys.secretSeed ? Stellar.Keypair.fromSeed(keys.secretSeed) : Stellar.Keypair.fromAccountId(keys.publicKey);

  return StellarHelper
    .getAccount(keypair.accountId())
    .then(account => {
      dispatch(setKeypair(keypair));
      dispatch(getAccountSuccess(account));
    })
    .catch(error => dispatch(getAccountError(error)));
};

export const updateAccount = accountId => dispatch => {
  return StellarHelper
    .getAccount(accountId)
    .then(account => {
      dispatch(getAccountSuccess(account));
    });
};

export function setKeypair(keypair) {
  return {
    type: actions.SET_KEYPAIR,
    keypair,
  };
}

function fetchingAccount() {
  return {
    type: actions.GET_ACCOUNT,
  };
}

export function getAccountSuccess(account) {
  return {
    type: actions.GET_ACCOUNT_SUCCESS,
    account,
  };
}

function getAccountError(error) {
  return {
    type: actions.GET_ACCOUNT_ERROR,
    error,
  };
}

function sendingPayment() {
  return {
    type: actions.SEND_PAYMENT,
  };
}

function sendPaymentSuccess(data) {
  return {
    type: actions.SEND_PAYMENT_SUCCESS,
    data,
  };
}

function sendPaymentError(error) {
  debugger;
  return {
    type: actions.SEND_PAYMENT_ERROR,
    error,
  };
}


export const sendPayment = formData => (dispatch, getState) => {
  dispatch(sendingPayment());

  const state = getState();
  const { keypair } = state.account;
  const sourceAccount = state.account.data;

  if(!keypair || !sourceAccount) {
    dispatch(sendPaymentError(new Error("Source account not set")));
  }
  if(!keypair.canSign()) {
    dispatch(sendPaymentError(new Error("Source account seed not set")));
  }

  const paymentData = Object.assign({}, formData, {
    keypair,
    sourceAccount,
  });

  return StellarHelper
    .sendPayment(paymentData)
    .catch(error =>
      dispatch(sendPaymentError(error))
    )
    .then(d => {
      console.log(d);
      dispatch(getAccount(data.account_id)); // Update account data
      dispatch(sendPaymentSuccess(d));
    });
};
