/* eslint new-cap: 0 */

import * as types from '../actions/ui';
import * as stellarTypes from '../actions/stellar';
import { createReducer } from '../helpers/redux';

const initialState = {
  destinationTruslines: [],
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

function setDestinationTrustlines(state, action) {
  const { destinationTruslines } = action;
  return {
    ...state,
    destinationTruslines,
  };
}

export default createReducer(initialState, {
  [types.SEND_OFFER]: sendingOffer,
  [types.SEND_OFFER_SUCCESS]: sendOfferSuccess,
  [types.OPEN_ERROR_MODAL]: openErrorModal,
  [types.CLOSE_ERROR_MODAL]: closeErrorModal,
  [types.OPEN_KEYPAIR_MODAL]: openKeypairModal,
  [types.CLOSE_KEYPAIR_MODAL]: closeKeypairModal,
  [stellarTypes.SET_DESTINATION_TRUSTLINES]: setDestinationTrustlines,
});
