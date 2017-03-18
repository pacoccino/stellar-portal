/* eslint new-cap: 0 */
import { findIndex } from 'lodash';

import * as types from '../actions/account';
import { DELETE_TRUSTLINE } from '../actions/ui';
import { editInArray, createReducer } from '../helpers/redux';

const initialState = {
  keypair: null,
  error: null,
};

function resetAccount() {
  return initialState;
}

function setKeypair(state, action) {
  const { keypair } = action;

  return {
    ...state,
    keypair,
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
    },
  };
}

export default createReducer(initialState, {
  [types.RESET_ACCOUNT]: resetAccount,
  [types.SET_KEYPAIR]: setKeypair,
  [DELETE_TRUSTLINE]: deletingTrustline,
});
