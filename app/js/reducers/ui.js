/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../actions/ui';
import { createReducer } from '../helpers/redux';

const initialState = {
  creatingTrustline: false,
  sendingPayment: false,
  sendingOffer: false,
  errorOpen: false,
  errorData: null,
  modalKeypair: false,
};

function openKeypairModal(state) {
  return {
    ...state,
    modalKeypair: true,
  };
}

function closeKeypairModal(state) {
  return {
    ...state,
    modalKeypair: false,
  };
}

function closeErrorModal(state) {
  return {
    ...state,
    errorOpen: false,
    errorData: null,
  };
}

function openErrorModal(state, action) {
  const { errorData } = action;
  return {
    ...state,
    errorOpen: true,
    errorData,
  };
}

function sendingPayment(state) {
  return {
    ...state,
    sendingPayment: true,
  };
}
function sendPaymentSuccess(state) {
  return {
    ...state,
    sendingPayment: false,
  };
}
function sendingOffer(state) {
  return {
    ...state,
    sendingOffer: true,
  };
}
function sendOfferSuccess(state) {
  return {
    ...state,
    sendingOffer: false,
  };
}
function creatingTrustline(state) {
  return {
    ...state,
    creatingTrustline: true,
  };
}
function creatingTrustlineSuccess(state) {
  return {
    ...state,
    creatingTrustline: false,
  };
}

export default createReducer(initialState, {
  [types.CREATE_TRUSTLINE]: creatingTrustline,
  [types.CREATE_TRUSTLINE_SUCCESS]: creatingTrustlineSuccess,
  [types.SEND_PAYMENT]: sendingPayment,
  [types.SEND_PAYMENT_SUCCESS]: sendPaymentSuccess,
  [types.SEND_OFFER]: sendingOffer,
  [types.SEND_OFFER_SUCCESS]: sendOfferSuccess,
  [types.OPEN_ERROR_MODAL]: openErrorModal,
  [types.CLOSE_ERROR_MODAL]: closeErrorModal,
  [types.OPEN_KEYPAIR_MODAL]: openKeypairModal,
  [types.CLOSE_KEYPAIR_MODAL]: closeKeypairModal,
});
