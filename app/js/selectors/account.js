import { createSelector } from 'reselect';
import { selectProperty } from '../helpers/redux';

import { ACCOUNT_STATE_KEY } from '../constants/reducerKeys';

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
  }),
);

export const canSign = createSelector(
  getAuthData,
  getKeypair,
  (authData, keypair) => (
    !!authData && !!authData.keypair && !!keypair.canSign() && !!authData.sourceAccount
  ),
);
export const accountSet = createSelector(
  getAuthData,
  authData => (
    !!authData && !!authData.keypair
  ),
);
