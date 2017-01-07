import { selectProperty } from '../helpers/redux';
import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY } from '../constants/reducerKeys';
import { OFFERS_KEY, PAYMENTS_KEY } from '../reducers/stellar';

export const getAccount = selectProperty([ACCOUNT_STATE_KEY, 'data'], {});
export const getBalances = selectProperty([ACCOUNT_STATE_KEY, 'data', 'balances'], []);

export const getPayments = selectProperty([STELLAR_STATE_KEY, PAYMENTS_KEY, 'data'], []);
export const getOffers = selectProperty([STELLAR_STATE_KEY, OFFERS_KEY, 'data'], []);