/* eslint new-cap: 0 */

import * as types from '../../constants/actionTypes';
import { createReducer } from '../../helpers/redux';

const initialState = {
  isLoading: false,
  data: [],
};

function getOffersSuccess(state, action) {
  const { offers } = action;
  return {
    ...state,
    data: offers,
    isLoading: false,
  }
}

export const offersReducer = createReducer(initialState, {
  [types.GET_OFFERS_SUCCESS]: getOffersSuccess,
});