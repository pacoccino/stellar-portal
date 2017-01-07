import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';
import { getAccountSuccess } from '../actions/account';
import { getPaymentsStream } from '../actions/stellar';

const streamers = {};

function newStream(name, stream) {
  if(streamers[name]) {
    streamers[name]();
  }
  streamers[name] = stream;
}

const stellarMiddleware = store => next => action => {
  switch (action.type) {
    case actions.SET_ACCOUNT_SUCCESS: {
      const { account } = action;

      try {
        // Stream account
        newStream('account',
          StellarHelper.getServerInstance()
            .accounts()
            .accountId(account.account_id)
            .stream({
              onmessage: account => {
                store.dispatch(getAccountSuccess(account));
              },
              onerror: console.error
            }));

        // Stream payment
        newStream('payment',
          StellarHelper.getServerInstance()
            .payments()
            .forAccount(account.account_id)
            .stream({
              onmessage: payment => {
                store.dispatch(getPaymentsStream(payment));
              },
              onerror: console.error
            }));
      } catch(e) {
        console.error(e)
      }
      break;
    }
  }

  next(action);
};

export default stellarMiddleware;
