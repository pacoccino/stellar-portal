/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../constants/actionTypes';

const initialState = {
  keypair: null,
  data: null,
  isLoading: false,
  error: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.SET_KEYPAIR: {
      const { keypair } = action;
      return Object.assign({}, state, { keypair });
    }
    case types.GET_ACCOUNT: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        data: action.account,
        isLoading: false,
        error: null,
      });
    }
    case types.GET_ACCOUNT_ERROR: {
      console.error(action.error);
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    }
    default:
      return state;
  }
}
