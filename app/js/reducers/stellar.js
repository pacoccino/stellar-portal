/* eslint new-cap: 0 */
import { merge } from 'lodash';

import { combineReducers } from 'redux';
import { paymentsReducer } from './stellar/payments';
import { offersReducer } from './stellar/offers';
import { networkReducer } from './stellar/network';

export const PAYMENTS_KEY = 'payments';
export const OFFERS_KEY = 'offers';
export const NETWORK_KEY = 'network';

export default combineReducers({
  [PAYMENTS_KEY]: paymentsReducer,
  [OFFERS_KEY]: offersReducer,
  [NETWORK_KEY]: networkReducer,
});