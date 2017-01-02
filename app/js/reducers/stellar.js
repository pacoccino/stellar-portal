/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../constants/actionTypes';

const initialState = {
  transactions: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.GET_TRANSACTIONS_SUCCESS: {
      const { transactions } = action;
      console.log(transactions)
      return Object.assign({}, state, { transactions });
    }
    default:
      return state;
  }
}
