import * as StellarServer from '../helpers/StellarServer';

import * as AccountActions from '../actions/account';
import { switchNetwork as switchNetworkInstance } from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getNetwork } from '../helpers/selector';

export const setAccount = (keys, router) => dispatch => {
  dispatch(AccountActions.fetchingAccount());

  const keypair = KeypairInstance(keys);

  return StellarServer
    .getAccount(keypair.accountId())
    .then(account => {
      if(router) {
        const query = {
          accountId: keypair.accountId(),
          secretSeed: keypair.canSign() ? keypair.seed() : undefined,
        };
        router.push({ query });
      }
      dispatch(AccountActions.setAccountSuccess(account, keypair));
      return account;
    })
    .catch(error => dispatch(AccountActions.getAccountError(error)));
};

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if(network === currentNetwork) return;

  switchNetworkInstance(network);
  dispatch(AccountActions.resetAccount());
  dispatch(AccountActions.switchNetwork(network));
};