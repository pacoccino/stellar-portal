import * as actions from '../constants/actionTypes';

export function setKeypair(keypair) {
  return {
    type: actions.SET_KEYPAIR,
    keypair,
  };
}

export function fetchingAccount() {
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

export function getAccountError(error) {
  return {
    type: actions.GET_ACCOUNT_ERROR,
    error,
  };
}

export function sendingPayment() {
  return {
    type: actions.SEND_PAYMENT,
  };
}

export function sendPaymentSuccess(data) {
  return {
    type: actions.SEND_PAYMENT_SUCCESS,
    data,
  };
}

export function sendPaymentError(error) {
  debugger;
  return {
    type: actions.SEND_PAYMENT_ERROR,
    error,
  };
}


export function getTransactionsSuccess(transactions) {
  return {
    type: actions.GET_TRANSACTIONS_SUCCESS,
    transactions,
  };
}
