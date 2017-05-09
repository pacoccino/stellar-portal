import { StellarStreamers } from 'stellar-toolkit';
import * as actions from '../actions/account';
import { getPaymentsStream, getEffectsStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';
import { AsyncActions } from '../helpers/asyncActions';
import { ASYNC_FETCH_ACCOUNT } from '../constants/asyncActions';

const { OffersStream, EffectsStream, AccountStream, PaymentStream } = StellarStreamers;

function traceError(e) {
  console.error(e);
}

const stellarStreamerMiddleware = store => next => (action) => {
  switch (action.type) {
    case actions.RESET_ACCOUNT: {
      killStreams();
      break;
    }
    // case 'aaaa:': {
    case actions.SET_KEYPAIR: {
      const { keypair } = action;

      // break;
      try {
        // Stream account
        newStream('account',
          AccountStream(keypair.publicKey(), (streamAccount) => {
            store.dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, streamAccount));
          }));

        // Stream offers
        newStream('offers',
          OffersStream(keypair.publicKey(), (offers) => {
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
