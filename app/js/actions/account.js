import * as actions from '../constants/actionTypes';
import * as StellarHelper from '../helpers/Stellar';

export function setAccountId(accountId) {
  return {
    type: actions.SET_ACCOUNT_ID,
    accountId,
  };
}

function setBalances(balances) {
  return {
    type: actions.GET_BALANCES_SUCCESS,
    balances,
  };
}

export const getBalances = accountId => dispatch => {
  return StellarHelper
    .getAccountBalance(accountId)
    .then(balances => {
      console.log(balances);
      dispatch(setBalances(balances));
    })
    .catch(console.error);
};
