import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';

export function setAccountId(accountId) {
  return {
    type: actions.SET_ACCOUNT_ID,
    accountId,
  };
}

function getBalancesSuccess(balances) {
  return {
    type: actions.GET_BALANCES_SUCCESS,
    balances,
  };
}

function getBalancesError(error) {
  return {
    type: actions.GET_BALANCES_ERROR,
    error,
  };
}

function fetchingBalances() {
  return {
    type: actions.GET_BALANCES,
  };
}

export const getBalances = accountId => dispatch => {
  dispatch(fetchingBalances());
  return StellarHelper
    .getAccountBalance(accountId)
    .then(balances => dispatch(getBalancesSuccess(balances)))
    .catch(error => dispatch(getBalancesError(error)));
};
