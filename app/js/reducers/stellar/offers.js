/* eslint new-cap: 0 */
import { findIndex } from 'lodash';

import * as typesAccount from '../../actions/account';
import * as types from '../../actions/stellar';
import { DELETE_OFFER } from '../../actions/ui';

import { editInArray, createReducer } from '../../helpers/redux';

const initialState = {
  isLoading: false,
  data: [],
};

function resetAccount() {
  return initialState;
}

function getOffersSuccess(state, action) {
  const { offers } = action;
  return {
    ...state,
    data: offers,
    isLoading: false,
  };
}

function deletingOffer(state, action) {
  const { offer } = action;
  const offerIndex = findIndex(state.data, { id: offer.id });
  const props = {
    isRemoving: true,
  };

  return {
    ...state,
    data: editInArray(state.data, props, offerIndex),
  };
}

function getOffersStream(state, action) {
  const { offer } = action;
  return {
    ...state,
    data: state.data.concat(offer),
  };
}

function resetStream(state) {
  return {
    ...state,
    data: [],
  };
}

export const offersReducer = createReducer(initialState, {
  [typesAccount.RESET_ACCOUNT]: resetAccount,
  [typesAccount.SET_KEYPAIR]: resetStream,
  [types.GET_OFFERS_SUCCESS]: getOffersSuccess,
  [types.GET_OFFERS_STREAM]: getOffersStream,
  [DELETE_OFFER]: deletingOffer,
});
