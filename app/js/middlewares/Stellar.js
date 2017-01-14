import * as actions from '../constants/actionTypes';
import { getServerInstance, OffersStream } from '../helpers/StellarServer';
import { getAccountSuccess } from '../actions/account';
import { getPaymentsStream, getOffersStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';

function traceError(e) {
  // console.error(e);
}

const stellarMiddleware = store => next => action => {
  switch (action.type) {
    case actions.RESET_ACCOUNT: {
      killStreams();
      break;
    }
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
            .order('desc')
            .stream({
              onmessage: payment => {
                payment.transaction().then(transaction => {
                  payment.transaction = transaction;
                  store.dispatch(getPaymentsStream(payment));
                });
              },
              onerror: traceError
            }));

        // Stream offers
        newStream('offers',
          OffersStream(account.account_id, offers => {
            console.log(offers)
            store.dispatch(getOffersSuccess(offers));
          }));
        /*getServerInstance()
          .offers('accounts', account.account_id)
          .order('desc')
          .stream({
            onmessage: offer => {
              store.dispatch(getOffersStream(offer));
            },
            onerror: traceError
          }));*/

      } catch(e) {
        traceError(e);
      }
      break;
    }
  }

  next(action);
};

export default stellarMiddleware;
