import * as actions from '../constants/actionTypes';


export function resetAccount() {
  return {
    type: actions.RESET_ACCOUNT,
  };
}
export function setAccountSuccess(account, keypair) {
  return {
    type: actions.SET_ACCOUNT_SUCCESS,
    account,
    keypair,
  };
}

export function fetchingAccount() {
  return {
    type: actions.GET_ACCOUNT,
  };
}

export function getAccountError(error) {
  return {
    type: actions.GET_ACCOUNT_ERROR,
    error,
  };
}

export function getAccountSuccess(account) {
  return {
    type: actions.GET_ACCOUNT_SUCCESS,
    account,
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
  return {
    type: actions.SEND_PAYMENT_ERROR,
    error,
  };
}

export function switchNetwork(network) {
  return {
    type: actions.SWITCH_NETWORK,
    network,
  };
}
