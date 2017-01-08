import { selectProperty } from '../helpers/redux';
import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY } from '../constants/reducerKeys';
import { OFFERS_KEY, PAYMENTS_KEY } from '../reducers/stellar';
import { Asset } from 'stellar-sdk';

export const getAccount = selectProperty([ACCOUNT_STATE_KEY, 'data'], {});
export const getBalances = selectProperty([ACCOUNT_STATE_KEY, 'data', 'balances'], []);
export const getKeypair = selectProperty([ACCOUNT_STATE_KEY, 'keypair'], []);

export const getPayments = selectProperty([STELLAR_STATE_KEY, PAYMENTS_KEY, 'data'], []);
export const getOffers = selectProperty([STELLAR_STATE_KEY, OFFERS_KEY, 'data'], []);

export const getTrustlines = (state) => {
  const balances = getBalances(state);

  function getLabel(balance) {
    if(balance.isNative()) {
      return 'XLM';
    }
    return `${balance.getCode()} (${balance.getIssuer()})`;
  }
  function getAsset(balance) {
    if(balance.asset_type === 'native') {
      return Asset.native();
    }
    return new Asset(balance.asset_code, balance.asset_issuer);
  }

  return balances.map(getAsset);
};