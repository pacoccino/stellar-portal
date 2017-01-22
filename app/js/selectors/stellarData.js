import { createSelector } from 'reselect';
import { selectProperty } from '../helpers/redux';

import { STELLAR_STATE_KEY, UI_STATE_KEY } from '../constants/reducerKeys';
import { EFFECTS_KEY, PAYMENTS_KEY } from '../reducers/stellar';

const getPayments = selectProperty([STELLAR_STATE_KEY, PAYMENTS_KEY, 'data'], []);
const getEffects = selectProperty([STELLAR_STATE_KEY, EFFECTS_KEY, 'data'], []);
export const getDestinationTrustlines = selectProperty([UI_STATE_KEY, 'destinationTruslines'], []);

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
