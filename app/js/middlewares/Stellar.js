import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';
import { getAccountSuccess, getTransactionsSuccess } from '../actions/account';

const stellarMiddleware = store => next => action => {

  switch (action.type) {
    case actions.SET_KEYPAIR: {

      const state = store.getState();
      const { account } = state;

      // Live update account
      StellarHelper.getAccountStream(action.keypair.accountId(), account => {
        store.dispatch(getAccountSuccess(account));
      });
      // Live update transactions
      StellarHelper.getTransactionsStream(action.keypair.accountId(), (transactions => {
        store.dispatch(getTransactionsSuccess(transactions));
      }));
      break;
    }
    case actions.GET_ACCOUNT_SUCCESS: {

    }

  }

  next(action);
};

export default stellarMiddleware;
