import * as types from '../../actions/stellar';

import { createReducer } from '../../helpers/redux';

const initialState = {
  isLoading: false,
  data: {},
};

function getOrderbook(state) {
  return {
    ...state,
    isLoading: true,
  };
}
function getOrderbookSuccess(state, action) {
  const { orderbook } = action;
  return {
    ...state,
    data: orderbook,
    isLoading: false,
  };
}


export const orderbookReducer = createReducer(initialState, {
  [types.GET_ORDERBOOK]: getOrderbook,
  [types.GET_ORDERBOOK_SUCCESS]: getOrderbookSuccess,
});
