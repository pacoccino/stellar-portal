import { selectProperty } from './redux';
import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY } from '../constants/reducerKeys';
import { OFFERS_KEY, PAYMENTS_KEY } from '../reducers/stellar';
import { AssetInstance } from './StellarTools';

export const getAccount = selectProperty([ACCOUNT_STATE_KEY, 'data'], {});
export const getBalances = selectProperty([ACCOUNT_STATE_KEY, 'data', 'balances'], []);
export const getKeypair = selectProperty([ACCOUNT_STATE_KEY, 'keypair'], []);
export const getAuthData = state => ({
  keypair: getKeypair(state),
  sourceAccount: getAccount(state),
});
export const canSign = state => {
  const authData = getAuthData(state);
  return !!authData.keypair && !!getKeypair(state).canSign() && !!authData.sourceAccount;
};

export const getPayments = selectProperty([STELLAR_STATE_KEY, PAYMENTS_KEY, 'data'], []);
export const getOffers = selectProperty([STELLAR_STATE_KEY, OFFERS_KEY, 'data'], []);

export const getTrustlines = (state) => getBalances(state).map(AssetInstance);
