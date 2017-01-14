/* eslint new-cap: 0 */

import * as types from '../../actions/account';
import { createReducer } from '../../helpers/redux';

const initialState = {
  network: 'test',
};

function switchNetwork(state, action) {
  const { network } = action;
  return {
    ...state,
    network,
  };
}

export const networkReducer = createReducer(initialState, {
  [types.SWITCH_NETWORK]: switchNetwork,
});
