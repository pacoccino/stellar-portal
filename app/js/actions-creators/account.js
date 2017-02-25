import { push } from 'react-router-redux';

import { AsyncActions } from '../helpers/asyncActions';
import * as AccountActions from '../actions/account';
import { ASYNC_FETCH_ACCOUNT } from '../constants/asyncActions';

import { getAccount, switchNetwork as switchNetworkInstance, generateTestPair } from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getNetwork } from '../selectors/stellarData';

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AsyncActions.startFetch(ASYNC_FETCH_ACCOUNT));

  const keypair = KeypairInstance(keys);
  const network = getNetwork(getState());

  return getAccount(keypair.accountId())
    .then((account) => {
      dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, account));
      dispatch(AccountActions.setKeypair(keypair));

      const putSecret = (keypair.canSign() && process.env.NODE_ENV === 'development');
      const query = {
        accountId: putSecret ? undefined : keypair.accountId(),
        secretSeed: putSecret ? keypair.seed() : undefined,
        network,
      };
      dispatch(push({ query }));

      return account;
    })
    .catch(error => dispatch(AsyncActions.errorFetch(ASYNC_FETCH_ACCOUNT, error)));
};

export const resetAccount = () => (dispatch) => {
  dispatch(push({ query: {} }));
  dispatch(AccountActions.resetAccount());
};

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if (network === currentNetwork) return;

  dispatch(resetAccount());

  switchNetworkInstance(network);
  dispatch(AccountActions.switchNetwork(network));
};

export const createTestAccount = () => (dispatch) => {
  dispatch(AccountActions.createTestAccount());
  generateTestPair()
    .then((newPair) => {
      dispatch(setAccount(newPair));
      dispatch(AccountActions.createTestAccountSuccess());
    })
    .catch(console.error);
};

