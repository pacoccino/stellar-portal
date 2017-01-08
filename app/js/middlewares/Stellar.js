import * as actions from '../constants/actionTypes';
import { getServerInstance } from '../helpers/StellarServer';
import { getAccountSuccess } from '../actions/account';
import { getPaymentsStream, getOffersStream } from '../actions/stellar';

const streamers = {};

function newStream(name, stream) {
  if(streamers[name]) {
    streamers[name]();
  }
  streamers[name] = stream;
}

function traceError(e) {
  // console.error(e);
}

const stellarMiddleware = store => next => action => {
  switch (action.type) {
    case actions.SET_ACCOUNT_SUCCESS: {
      const { account } = action;

      try {
        // Stream account
        newStream('account',
          getServerInstance()
            .accounts()
            .accountId(account.account_id)
            .stream({
              onmessage: account => {
                store.dispatch(getAccountSuccess(account));
              },
              onerror: traceError
            }));

        // Stream payment
        newStream('payment',
          getServerInstance()
            .payments()
            .forAccount(account.account_id)
            .stream({
              onmessage: payment => {
                store.dispatch(getPaymentsStream(payment));
              },
              onerror: traceError
            }));

        // Stream offers
        newStream('offers',
          getServerInstance()
            .offers('accounts', account.account_id)
            .stream({
              onmessage: offer => {
                store.dispatch(getOffersStream(offer));
              },
              onerror: traceError
            }));
      } catch(e) {
        traceError(e);
      }
      break;
    }
  }

  next(action);
};

export default stellarMiddleware;
