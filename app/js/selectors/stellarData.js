import { createSelector } from 'reselect';
import { selectProperty } from '../helpers/redux';

import { STELLAR_STATE_KEY } from '../constants/reducerKeys';
import { EFFECTS_KEY, PAYMENTS_KEY, OFFERS_KEY, ORDERBOOK_KEY, NETWORK_KEY } from '../reducers/stellar';

export const getNetwork = selectProperty([STELLAR_STATE_KEY, NETWORK_KEY, 'network'], '');

export const getOffers = selectProperty([STELLAR_STATE_KEY, OFFERS_KEY, 'data'], []);
export const getOrderbook = selectProperty([STELLAR_STATE_KEY, ORDERBOOK_KEY, 'data'], {});
export const isFetchingOrderbook = selectProperty([STELLAR_STATE_KEY, ORDERBOOK_KEY, 'isLoading'], false);

export const getTrustlines = createSelector(
  getBalances,
  balances => balances.map(b => b.asset)
);

const getPayments = selectProperty([STELLAR_STATE_KEY, PAYMENTS_KEY, 'data'], []);
const getEffects = selectProperty([STELLAR_STATE_KEY, EFFECTS_KEY, 'data'], []);

export const getPaymentsFromPayments = createSelector(
  getPayments,
  payments => payments.filter(payment => (
    (payment.type === 'payment') && (payment.from !== payment.to)
  )),
);

export const getPathPaymentsFromPayments = createSelector(
  getPayments,
  payments => payments.filter(payment => (
    (payment.type === 'path_payment') && (payment.from !== payment.to)
  )),
);

export const getPaymentsFromEffects = createSelector(
  getEffects,
  effects => effects.filter(effect => (
    effect.type === 'account_credited' || effect.type === 'account_debited'
  )),
);

export const getPathPaymentsFromEffects = createSelector(
  getEffects,
  effects => effects.filter(effect => (
    (effect.type === 'account_credited') || (effect.type === 'account_debited')
  )),
);
