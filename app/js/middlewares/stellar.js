import * as actions from '../constants/actionTypes';
import { getBalances } from '../actions/account';

const stellarMiddleware = store => next => action => {

  switch (action.type) {
    case actions.SET_ACCOUNT_ID:
      store.dispatch(getBalances(action.accountId));
      break;
  }

  next(action);
};

export default stellarMiddleware;
