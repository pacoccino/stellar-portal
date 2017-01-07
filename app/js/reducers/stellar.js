/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../constants/actionTypes';
import { createReducer } from '../helpers/redux';

const initialState = {
  payments: [],
  effects: [],
  offers: [],
};

function getPaymentsSuccess(state, action) {
  const { payments } = action;
  console.log(payments);
  return {
    ...state,
    payments,
  }
}

export default createReducer(initialState, {
  [types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
});
