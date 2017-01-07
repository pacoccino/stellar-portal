import Stellar from 'stellar-sdk';

import * as StellarHelper from '../helpers/Stellar';

import * as AccountActions from '../actions/account';

export const setAccount = keys => dispatch => {
  dispatch(AccountActions.fetchingAccount());

  const keypair = keys.secretSeed ? Stellar.Keypair.fromSeed(keys.secretSeed) : Stellar.Keypair.fromAccountId(keys.publicKey);

  return StellarHelper
    .getAccount(keypair.accountId())
    .then(account => {
      dispatch(AccountActions.setAccountSuccess(account, keypair));
    })
    .catch(error => dispatch(AccountActions.getAccountError(error)));
};
