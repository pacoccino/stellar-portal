import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';

export const getAccount = accountId => dispatch => {
  dispatch(fetchingAccount());
  return StellarHelper
    .getAccount(accountId)
    .catch(error => dispatch(getAccountError(error)))
    .then(account => dispatch(getAccountSuccess(account)));
};

export function setSeed(seed) {
  return {
    type: actions.SET_SEED,
    seed,
  };
}

function fetchingAccount() {
  return {
    type: actions.GET_ACCOUNT,
  };
}

function getAccountSuccess(account) {
  return {
    type: actions.GET_ACCOUNT_SUCCESS,
    account,
  };
}

function getAccountError(error) {
  debugger;
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
  const { seed, data } = state.account;

  if(!seed || !data) {
    dispatch(sendPaymentError(new Error("Source account not defined")));
  }

  const paymentData = Object.assign({}, formData, {
    seed,
    sequenceNumber: data.sequence,
  });

  return StellarHelper
    .sendPayment(paymentData)
    .catch(error =>
      dispatch(sendPaymentError(error))
    )
    .then(d => {
      console.log(d);
      dispatch(getAccount(data.account_id)); // To update sequence number
      dispatch(sendPaymentSuccess(d)); // To update sequence number
    });
};
