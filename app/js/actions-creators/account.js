import { StellarServer, StellarTools } from 'stellar-toolkit';

import { AsyncActions } from '../helpers/asyncActions';
import * as AccountActions from '../actions/account';
import { ASYNC_FETCH_ACCOUNT, ASYNC_CREATE_TEST_ACCOUNT } from '../constants/asyncActions';

import { getNetwork } from '../selectors/stellarData';

const { getAccount, switchNetwork: switchNetworkInstance, generateTestPair } = StellarServer;
const { KeypairInstance } = StellarTools;

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AsyncActions.startFetch(ASYNC_FETCH_ACCOUNT));

  const keypair = KeypairInstance(keys);

  return getAccount(keypair.publicKey())
    .then((account) => {
      dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, account));
      dispatch(AccountActions.setKeypair(keypair));

      return account;
    })
    .catch(error => dispatch(AsyncActions.errorFetch(ASYNC_FETCH_ACCOUNT, error)));
};

export const resetAccount = () => (dispatch) => {
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
  dispatch(AsyncActions.startLoading(ASYNC_CREATE_TEST_ACCOUNT));
  generateTestPair()
    .then((newPair) => {
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_TEST_ACCOUNT));
      dispatch(setAccount(newPair));
    })
    .catch(console.error);
};

