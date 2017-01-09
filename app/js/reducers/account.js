/* eslint new-cap: 0 */
import { findIndex, merge } from 'lodash';

import * as types from '../constants/actionTypes';
import { DELETE_TRUSTLINE } from '../actions/ui';
import { editInArray, createReducer } from '../helpers/redux';
import { AssetInstance } from '../helpers/StellarTools';

const initialState = {
  keypair: null,
  data: null,
  isLoading: false,
  error: null,
};

function resetAccount() {
  return initialState;
}

function augmentAccount(account) {
  return {
    ...account,
    balances: account.balances.map(b => ({
      ...b,
      asset: AssetInstance(b)
    })),
  };
}

function setAccount(state, action) {
  const { account, keypair } = action;

  return {
    ...state,
    data: augmentAccount(account),
    keypair,
    isLoading: false,
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
    data: augmentAccount(account),
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

function deletingTrustline(state, action) {
  const { trustline } = action;
  const trustlineIndex = findIndex(state.data.balances, t => t.asset.equals(trustline));
  const props = {
    isDeleting: true,
  };
  return {
    ...state,
    data: {
      ...(state.data),
      balances: editInArray(state.data.balances, props, trustlineIndex),
    }
  };
}

export default createReducer(initialState, {
  [types.RESET_ACCOUNT]: resetAccount,
  [types.SET_ACCOUNT_SUCCESS]: setAccount,
  [types.GET_ACCOUNT]: getAccount,
  [types.GET_ACCOUNT_SUCCESS]: getAccountSuccess,
  [types.GET_ACCOUNT_ERROR]: getAccountError,
  [DELETE_TRUSTLINE]: deletingTrustline,
});
