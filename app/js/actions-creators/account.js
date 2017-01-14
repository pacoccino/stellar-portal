import * as StellarServer from '../helpers/StellarServer';

import * as AccountActions from '../actions/account';
import { switchNetwork as switchNetworkInstance } from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getNetwork } from '../helpers/selector';
import { push } from 'react-router-redux'

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

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if(network === currentNetwork) return;

  dispatch(push({ query: {} }));

  switchNetworkInstance(network);
  dispatch(AccountActions.resetAccount());
  dispatch(AccountActions.switchNetwork(network));
};
