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

function getPaymentsSuccess(state, action) {
  const { payments } = action;
  return {
    ...state,
    data: payments,
    isLoading: false,
  }
}

function getPaymentsStream(state, action) {
  const { payment } = action;
  return {
    ...state,
    data: state.data.concat(payment),
  }
}

function resetStream(state) {
  return {
    ...state,
    data: [],
  }
}

export const paymentsReducer = createReducer(initialState, {
  [types.RESET_ACCOUNT]: resetAccount,
  [types.SET_ACCOUNT_SUCCESS]: resetStream,
  [types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
  [types.GET_PAYMENTS_STREAM]: getPaymentsStream,
});
