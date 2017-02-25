import { push } from 'react-router-redux';

import * as AccountActions from '../actions/account';

import { getAccount, switchNetwork as switchNetworkInstance, generateTestPair } from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getNetwork } from '../selectors/stellarData';

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AccountActions.fetchingAccount());

  const keypair = KeypairInstance(keys);
  const network = getNetwork(getState());

  return getAccount(keypair.accountId())
    .then((account) => {
      const putSecret = (keypair.canSign() && process.env.NODE_ENV === 'development');
      const query = {
        accountId: putSecret ? undefined : keypair.accountId(),
        secretSeed: putSecret ? keypair.seed() : undefined,
        network,
      };
      dispatch(push({ query }));

      dispatch(AccountActions.setAccountSuccess(account, keypair));
      return account;
    })
    .catch(error => dispatch(AccountActions.getAccountError(error)));
};

export const resetAccount = () => (dispatch) => {
  dispatch(push({ query: {} }));
  dispatch(AccountActions.resetAccount());
};

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if(network === currentNetwork) return;

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

