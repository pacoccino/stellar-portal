/* eslint new-cap: 0 */
import * as types from '../constants/actionTypes';
import { merge } from 'lodash';

const initialState = {
  accountId: null,
  balances: null,
  isLoading: false,
  error: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.SET_ACCOUNT_ID: {
      return Object.assign({}, state, {
        accountId: action.accountId,
      });
    }
    case types.GET_BALANCES: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case types.GET_BALANCES_SUCCESS: {
      return Object.assign({}, state, {
        balances: action.balances,
        isLoading: false,
        error: null,
      });
    }
    case types.GET_BALANCES_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    }
    default:
      return state;
  }
}
