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

export const sendPayment = formData => (dispatch, getState) => {
  dispatch(AccountActions.sendingPayment());

  const state = getState();
  const { keypair } = state.account;
  const sourceAccount = state.account.data;

  if(!keypair || !sourceAccount) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account not set")));
  }
  if(!keypair.canSign()) {
    dispatch(AccountActions.sendPaymentError(new Error("Source account seed not set")));
  }

  const paymentData = Object.assign({}, formData, {
    keypair,
    sourceAccount,
  });

  return StellarHelper
    .sendPayment(paymentData)
    .catch(error =>
      dispatch(AccountActions.sendPaymentError(error))
    )
    .then(d => {
      console.log(d);
      dispatch(getAccount(d.account_id)); // Update account data
      dispatch(AccountActions.sendPaymentSuccess(d));
    });
};
