import * as actions from '../actions/account';
import { OffersStream, EffectsStream, AccountStream, PaymentStream } from '../helpers/StellarServer';
import { getPaymentsStream, getEffectsStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';
import { AsyncActions } from '../helpers/asyncActions';
import { ASYNC_FETCH_ACCOUNT } from '../constants/asyncActions';

function traceError() {
  // console.error(e);
}

const stellarStreamerMiddleware = store => next => (action) => {
  switch (action.type) {
    case actions.RESET_ACCOUNT: {
      killStreams();
      break;
    }
    // TODO augment account on async fetch account
    case actions.SET_KEYPAIR: {
      const { account } = action;

      try {
        // Stream account
        // newStream('account',
        //   AccountStream(account.account_id, (streamAccount) => {
        //     store.dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, streamAccount));
        //   }));

        // Stream effects
        newStream('effects',
          EffectsStream(account.account_id, (effect) => {
            store.dispatch(getEffectsStream(effect));
          }));

        // Stream payment
        newStream('payment',
          PaymentStream(account.account_id, (payment) => {
            store.dispatch(getPaymentsStream(payment));
          }));

        // Stream offers
        newStream('offers',
          OffersStream(account.account_id, (offers) => {
            store.dispatch(getOffersSuccess(offers));
          }));
      } catch (e) {
        traceError(e);
      }
      break;
    }
    default:
  }

  next(action);
};

export default stellarStreamerMiddleware;
