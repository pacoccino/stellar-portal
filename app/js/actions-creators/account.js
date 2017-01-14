import * as StellarServer from '../helpers/StellarServer';

import * as AccountActions from '../actions/account';
import { switchNetwork as switchNetworkInstance, generateTestPair } from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getNetwork } from '../helpers/selector';
import { push } from 'react-router-redux';

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AccountActions.fetchingAccount());

  const keypair = KeypairInstance(keys);
  const network = getNetwork(getState());

  return StellarServer
    .getAccount(keypair.accountId())
    .then(account => {
      const query = {
        accountId: keypair.canSign() ? undefined : keypair.accountId(),
        secretSeed: keypair.canSign() ? keypair.seed() : undefined,
        network,
      };
      dispatch(push({ query }));

      dispatch(AccountActions.setAccountSuccess(account, keypair));
      return account;
    })
    .catch(error => dispatch(AccountActions.getAccountError(error)));
};

export const resetAccount = () => dispatch => {

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

export const createTestAccount = () =>  dispatch => {
  dispatch(AccountActions.createTestAccount());
  generateTestPair()
    .then(newPair => {
      dispatch(setAccount(newPair));
      dispatch(AccountActions.createTestAccountSuccess());
    })
    .catch(console.error);
};

// export const createTestAccount = () => async dispatch => dispatch(setAccount(await generatePair()));
