/* eslint new-cap: 0 */
import * as types from '../constants/actionTypes';
import { merge } from 'lodash';

const initialState = {
  accountId: null,
  data: null,
  isLoading: false,
  error: null,
  seed: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.SET_SEED: {
      const { seed } = action;
      return Object.assign({}, state, {
        seed
      });
    }
    case types.GET_ACCOUNT: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        accountId: action.account.account_id,
        data: action.account,
        isLoading: false,
        error: null,
      });
    }
    case types.GET_ACCOUNT_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    }
    default:
      return state;
  }
}
