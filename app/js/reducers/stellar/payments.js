/* eslint new-cap: 0 */

import * as typesAccount from '../../actions/account';
import * as types from '../../actions/stellar';
import { createReducer } from '../../helpers/redux';

const initialState = {
  isLoading: false,
  data: [],
};

function resetAccount() {
  return initialState;
}

function resetStream(state) {
  return {
    ...state,
    data: [],
  };
}

function getPaymentsSuccess(state, action) {
  const { payments } = action;
  return {
    ...state,
    data: payments,
    isLoading: false,
  };
}

function getPaymentsStream(state, action) {
  const { payment } = action;
  return {
    ...state,
    data: state.data.concat(payment),
  };
}

export const paymentsReducer = createReducer(initialState, {
  [typesAccount.RESET_ACCOUNT]: resetAccount,
  [typesAccount.SET_KEYPAIR]: resetStream,
  [types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
  [types.GET_PAYMENTS_STREAM]: getPaymentsStream,
});
