/* eslint new-cap: 0 */
import * as types from '../constants/actionTypes';
import { merge } from 'lodash';

const initialState = {
  accountId: null,
  balances: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.SET_ACCOUNT_ID: {
      return merge({}, state, {
        accountId: action.accountId,
      });
    }
    case types.GET_BALANCES_SUCCESS: {
      return merge({}, state, {
        balances: action.balances,
      });
    }
    default:
      return state;
  }
}
