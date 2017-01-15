import { createSelector } from 'reselect';
import { selectProperty } from './redux';

import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY, UI_STATE_KEY } from '../constants/reducerKeys';
import { OFFERS_KEY, ORDERBOOK_KEY, NETWORK_KEY } from '../reducers/stellar';

export const getNetwork = selectProperty([STELLAR_STATE_KEY, NETWORK_KEY, 'network'], '');

export const isAccountLoading = selectProperty([ACCOUNT_STATE_KEY, 'isLoading'], false);
export const isCreatingTestAccount = selectProperty([ACCOUNT_STATE_KEY, 'isCreatingTestAccount'], false);
export const getAccount = selectProperty([ACCOUNT_STATE_KEY, 'data'], null);
export const getAccountError = selectProperty([ACCOUNT_STATE_KEY, 'error'], {});
export const getBalances = selectProperty([ACCOUNT_STATE_KEY, 'data', 'balances'], []);
export const getKeypair = selectProperty([ACCOUNT_STATE_KEY, 'keypair'], null);
export const getAuthData = createSelector(
  getKeypair,
  getAccount,
  (keypair, sourceAccount) => ({
    keypair,
    sourceAccount,
  })
);

export const canSign = createSelector(
  getAuthData,
  getKeypair,
  (authData, keypair) => (
    !!authData && !!authData.keypair && !!keypair.canSign() && !!authData.sourceAccount
  )
);
export const accountSet = createSelector(
  getAuthData,
  authData => (
    !!authData && !!authData.keypair
  )
);


export const getOffers = selectProperty([STELLAR_STATE_KEY, OFFERS_KEY, 'data'], []);
export const getOrderbook = selectProperty([STELLAR_STATE_KEY, ORDERBOOK_KEY, 'data'], {});
export const isFetchingOrderbook = selectProperty([STELLAR_STATE_KEY, ORDERBOOK_KEY, 'isLoading'], false);

export const getTrustlines = createSelector(
  getBalances,
  balances => balances.map(b => b.asset)
);

export const isModalKeypairOpen = selectProperty([UI_STATE_KEY, 'modalKeypair'], false);
export const getModalErrorOpen = selectProperty([UI_STATE_KEY, 'errorOpen'], false);
export const getModalErrorData = selectProperty([UI_STATE_KEY, 'errorData'], '');

export const isSendingPayment = selectProperty([UI_STATE_KEY, 'sendingPayment'], false);
export const isSendingOffer = selectProperty([UI_STATE_KEY, 'sendingOffer'], false);
export const isCreatingTrustline = selectProperty([UI_STATE_KEY, 'creatingTrustline'], false);
