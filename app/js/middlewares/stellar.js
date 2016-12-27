import * as actions from '../constants/actionTypes';
import Stellar from 'stellar-sdk';

import { getAccount } from '../actions/account';

const stellarMiddleware = store => next => action => {

  switch (action.type) {
    case actions.SET_SEED: {
      const sourceKeypair = Stellar.Keypair.fromSeed(action.seed);
      const sourceAddress = sourceKeypair.accountId();

      store.dispatch(getAccount(sourceAddress));
      break;
    }
  }

  next(action);
};

export default stellarMiddleware;
