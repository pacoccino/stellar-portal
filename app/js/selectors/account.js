import { createSelector } from 'reselect';
import { selectProperty } from '../helpers/redux';

import { ASYNC_FETCH_ACCOUNT, ASYNC_CREATE_TEST_ACCOUNT } from '../constants/asyncActions';
import { ACCOUNT_STATE_KEY } from '../constants/reducerKeys';
import { asyncSelectorObject } from '../helpers/asyncActions/selectors';

export const getAccount = asyncSelectorObject(ASYNC_FETCH_ACCOUNT).data;
export const getAccountError = asyncSelectorObject(ASYNC_FETCH_ACCOUNT).error;
export const isAccountLoading = asyncSelectorObject(ASYNC_FETCH_ACCOUNT).isLoading;

export const isCreatingTestAccount = asyncSelectorObject(ASYNC_CREATE_TEST_ACCOUNT).isLoading;

export const getKeypair = selectProperty([ACCOUNT_STATE_KEY, 'keypair'], null);

export const getBalances = createSelector(
  getAccount,
  account => (account && account.balances) || [],
);

export const canSign = createSelector(
  getKeypair,
  (keypair) => (
    keypair && !!keypair.canSign()
  ),
);
export const accountSet = createSelector(
  getKeypair,
  getAccount,
  (keypair, account) => (
    !!(keypair && account)
  ),
);
