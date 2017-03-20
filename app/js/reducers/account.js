/* eslint new-cap: 0 */
import { findIndex } from 'lodash';

import * as types from '../actions/account';
import { DELETE_TRUSTLINE } from '../actions/ui';
import { editInArray, createReducer } from '../helpers/redux';
import { KeypairInstance } from '../helpers/StellarTools';
import { setLocalAccounts } from '../helpers/storage';

const initialState = {
  keypair: null,
  error: null,
  currentAccountId: null,
  accounts: [],
};

function resetAccount(state) {
  return {
    ...state,
    keypair: null,
    currentAccountId: null,
  };
}

function setKeypair(state, action) {
  const { keypair } = action;

  return {
    ...state,
    keypair: KeypairInstance(keypair),
  };
}

function setCurrentAccountId(state, action) {
  const { id } = action;

  return {
    ...state,
    currentAccountId: id,
  };
}

function addAccount(state, action) {
  const { account, accounts } = action;

  let newAccounts = state.accounts.slice();
  if (account) {
    const localAccountIndex = newAccounts.findIndex(a => a.id === account.id);
    if (localAccountIndex !== -1) {
      newAccounts[localAccountIndex] = account;
    } else {
      newAccounts.push(account);
    }
  }
  if (accounts) {
    newAccounts = newAccounts.concat(accounts);
  }

  setLocalAccounts(newAccounts);
  return {
    ...state,
    accounts: newAccounts,
  };
}

function deletingTrustline(state, action) {
  const { trustline } = action;
  const trustlineIndex = findIndex(state.data.balances, t => t.asset.equals(trustline));
  const props = {
    isDeleting: true,
  };
  return {
    ...state,
    data: {
      ...(state.data),
      balances: editInArray(state.data.balances, props, trustlineIndex),
    },
  };
}

export default createReducer(initialState, {
  [types.RESET_ACCOUNT]: resetAccount,
  [types.SET_KEYPAIR]: setKeypair,
  [types.SET_CURRENT_ACCOUNT_ID]: setCurrentAccountId,
  [types.ADD_ACCOUNT]: addAccount,
  [DELETE_TRUSTLINE]: deletingTrustline,
});
