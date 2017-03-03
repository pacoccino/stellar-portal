export const SWITCH_NETWORK = 'network:switch';

export const RESET_ACCOUNT = 'account:reset';
export const ADD_ACCOUNT = 'account:add';
export const SET_CURRENT_ACCOUNT_ID = 'account:set-id';

export function resetAccount() {
  return {
    type: RESET_ACCOUNT,
  };
}

export function setCurrentAccountId(id) {
  return {
    type: SET_CURRENT_ACCOUNT_ID,
    id,
  };
}

export function switchNetwork(network) {
  return {
    type: SWITCH_NETWORK,
    network,
  };
}

export function addAccount(account, accounts) {
  return {
    type: ADD_ACCOUNT,
    account,
    accounts,
  };
}

export function addAccounts(accounts) {
  return addAccount(null, accounts);
}
