export const SWITCH_NETWORK = 'network:switch';

export const RESET_ACCOUNT = 'account:reset';
export const CREATE_TEST_ACCOUNT = 'account:create-test:fetching';
export const CREATE_TEST_ACCOUNT_SUCCESS = 'account:create-test:success';
export const SET_ACCOUNT_SUCCESS = 'account:set';

export const GET_ACCOUNT = 'account:fetching';
export const GET_ACCOUNT_SUCCESS = 'account:success';
export const GET_ACCOUNT_ERROR = 'account:error';


export function resetAccount() {
  return{
    type: RESET_ACCOUNT,
  };
}
export function setAccountSuccess(account, keypair) {
  return{
    type: SET_ACCOUNT_SUCCESS,
    account,
    keypair,
  };
}

export function fetchingAccount() {
  return{
    type: GET_ACCOUNT,
  };
}

export function getAccountError(error) {
  return{
    type: GET_ACCOUNT_ERROR,
    error,
  };
}

export function getAccountSuccess(account) {
  return{
    type: GET_ACCOUNT_SUCCESS,
    account,
  };
}

export function switchNetwork(network) {
  return{
    type: SWITCH_NETWORK,
    network,
  };
}

export function createTestAccount() {
  return{
    type: CREATE_TEST_ACCOUNT,
  };
}

export function createTestAccountSuccess() {
  return{
    type: CREATE_TEST_ACCOUNT_SUCCESS,
  };
}
