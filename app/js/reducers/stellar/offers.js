/* eslint new-cap: 0 */

import * as types from '../../constants/actionTypes';
import { createReducer } from '../../helpers/redux';

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
  }
}

function getOffersStream(state, action) {
  const { offer } = action;
  return {
    ...state,
    data: state.data.concat(offer),
  }
}

function resetStream(state) {
  return {
    ...state,
    data: [],
  }
}

export const offersReducer = createReducer(initialState, {
  [types.RESET_ACCOUNT]: resetAccount,
  [types.SET_ACCOUNT_SUCCESS]: resetStream,
  [types.GET_OFFERS_SUCCESS]: getOffersSuccess,
  [types.GET_OFFERS_STREAM]: getOffersStream,
});
