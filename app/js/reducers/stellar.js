/* eslint new-cap: 0 */

import { combineReducers } from 'redux';
import { paymentsReducer } from './stellar/payments';
import { effectsReducer } from './stellar/effects';
import { offersReducer } from './stellar/offers';
import { networkReducer } from './stellar/network';

export const PAYMENTS_KEY = 'payments';
export const OFFERS_KEY = 'offers';
export const EFFECTS_KEY = 'effects';
export const NETWORK_KEY = 'network';

export default combineReducers({
  [PAYMENTS_KEY]: paymentsReducer,
  [OFFERS_KEY]: offersReducer,
  [EFFECTS_KEY]: effectsReducer,
  [NETWORK_KEY]: networkReducer,
});
