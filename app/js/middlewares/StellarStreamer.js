import * as actions from '../actions/account';
import { getServerInstance, OffersStream, EffectsStream } from '../helpers/StellarServer';
import { getAccountSuccess } from '../actions/account';
import { getPaymentsStream, getEffectsStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';

function traceError(e) {
  // console.error(e);
}

const stellarStreamerMiddleware = store => next => action => {
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

        // Stream effects
        newStream('effects',
          EffectsStream(account.account_id, effect => {
            store.dispatch(getEffectsStream(effect));
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

export default stellarStreamerMiddleware;
