import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';
import { getAccountSuccess, getTransactionsSuccess } from '../actions/account';

const stellarMiddleware = store => next => action => {

  switch (action.type) {
    case actions.SET_KEYPAIR: {

      // Live update account
      StellarHelper.getAccountStream(action.keypair.accountId(), account => {
        store.dispatch(getAccountSuccess(account));
      });
      break;
    }

  }

  next(action);
};

export default stellarMiddleware;
