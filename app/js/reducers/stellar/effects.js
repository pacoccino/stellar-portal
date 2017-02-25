/* eslint new-cap: 0 */

import * as typesAccount from '../../actions/account';
import * as types from '../../actions/stellar';
import { createReducer } from '../../helpers/redux';

const initialState = {
  isLoading: false,
  data: [],
};

function reset() {
  return initialState;
}

function getEffectsStream(state, action) {
  const { effect } = action;
  return {
    ...state,
    data: state.data.concat(effect),
  };
}

export const effectsReducer = createReducer(initialState, {
  [typesAccount.RESET_ACCOUNT]: reset,
  [typesAccount.SET_KEYPAIR]: reset,
  [types.GET_EFFECT_STREAM]: getEffectsStream,
});
