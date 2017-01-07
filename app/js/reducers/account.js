/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../constants/actionTypes';
import { createReducer } from '../helpers/redux';

const initialState = {
  keypair: null,
  data: null,
  isLoading: false,
  error: null,
};

function setKeypair(state, action) {
  const { keypair } = action;
  return {
    ...state,
    keypair,
  };
}
function getAccount(state) {
  return {
    ...state,
    isLoading: true,
  };
}
function getAccountSuccess(state, action) {
  const { account } = action;
  return {
    ...state,
    data: account,
    isLoading: false,
    error: null,
  };
}
function getAccountError(state, action) {
  const { error } = action;
  return {
    ...state,
    isLoading: false,
    error,
  };
}

export default createReducer(initialState, {
  [types.SET_KEYPAIR]: setKeypair,
  [types.GET_ACCOUNT]: getAccount,
  [types.GET_ACCOUNT_SUCCESS]: getAccountSuccess,
  [types.GET_ACCOUNT_ERROR]: getAccountError,
});
