import * as actions from '../actions/account';
import { OffersStream, EffectsStream, AccountStream, PaymentStream } from '../helpers/StellarServer';
import { getPaymentsStream, getEffectsStream, getOffersSuccess } from '../actions/stellar';
import { newStream, killStreams } from '../helpers/monoStreamer';
import { getAccounts } from '../selectors/account';
import { AsyncActions } from '../helpers/asyncActions';
import { ASYNC_FETCH_ACCOUNT } from '../constants/asyncActions';

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
    case actions.SET_CURRENT_ACCOUNT_ID: {
      const { id } = action;

      const state = store.getState();
      const currentAccount = getAccounts(state).find(a => a.id === id);
      const keypair = currentAccount.keypair;
      try {
        // Stream account
        newStream('account',
          AccountStream(keypair.publicKey(), (streamAccount) => {
            store.dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, streamAccount));
          }));

        // Stream effects
        newStream('effects',
          EffectsStream(keypair.publicKey(), (effect) => {
            store.dispatch(getEffectsStream(effect));
          }));

        // Stream payment
        newStream('payment',
          PaymentStream(keypair.publicKey(), (payment) => {
            store.dispatch(getPaymentsStream(payment));
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
