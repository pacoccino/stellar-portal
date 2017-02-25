import * as actions from '../actions/account';
import { getServerInstance, OffersStream, EffectsStream } from '../helpers/StellarServer';
import { getPaymentsStream, getEffectsStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';

function traceError() {
  // console.error(e);
}

const stellarStreamerMiddleware = store => next => (action) => {
  switch(action.type) {
    case actions.RESET_ACCOUNT: {
      killStreams();
      break;
    }
    case actions.SET_ACCOUNT_SUCCESS: {
      const{ account } = action;

      try{
        // Stream account
        newStream('account',
          getServerInstance()
            .accounts()
            .accountId(account.account_id)
            .streamé({
              onmessage: (streamAccount) => {
                store.dispatch(actions.getAccountSuccess(streamAccount));
              },
              onerror: traceError,
            }));

        // Stream effects
        newStream('effects',
          EffectsStream(account.account_id, (effect) => {
            store.dispatch(getEffectsStream(effect));
          }));

        // Stream payment
        newStream('payment',
          getServerInstance()
            .payments()
            .forAccount(account.account_id)
            .order('asc')
            .stream({
              onmessage: (payment) => {
                payment.transaction().then((transaction) => {
                  store.dispatch(getPaymentsStream({
                    ...payment,
                    transaction,
                  }));
                });
              },
              onerror: traceError,
            }));

        // Stream offers
        newStream('offers',
          OffersStream(account.account_id, (offers) => {
            store.dispatch(getOffersSuccess(offers));
          }));
        /* getServerInstance()
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
    default:
  }

  next(action);
};

export default stellarStreamerMiddleware;
