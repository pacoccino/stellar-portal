/* eslint new-cap: 0 */
import { merge } from 'lodash';

import * as types from '../actions/ui';
import { createReducer } from '../helpers/redux';

const initialState = {
  errorOpen: false,
  errorData: null,
};

function closeErrorModal() {
  return initialState;
}

function openErrorModal(state, action) {
  const { errorData } = action;
  return {
    ...state,
    errorOpen: true,
    errorData,
  };
}

export default createReducer(initialState, {
  [types.OPEN_ERROR_MODAL]: openErrorModal,
  [types.CLOSE_ERROR_MODAL]: closeErrorModal,
});
