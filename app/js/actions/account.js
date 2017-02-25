export const SWITCH_NETWORK = 'network:switch';

export const RESET_ACCOUNT = 'account:reset';
export const CREATE_TEST_ACCOUNT = 'account:create-test:fetching';
export const CREATE_TEST_ACCOUNT_SUCCESS = 'account:create-test:success';
export const SET_KEYPAIR = 'keypair:set';


export function resetAccount() {
  return {
    type: RESET_ACCOUNT,
  };
}

export function setKeypair(keypair) {
  return {
    type: SET_KEYPAIR,
    keypair,
  };
}

export function switchNetwork(network) {
  return {
    type: SWITCH_NETWORK,
    network,
  };
}

export function createTestAccount() {
  return {
    type: CREATE_TEST_ACCOUNT,
  };
}

export function createTestAccountSuccess() {
  return {
    type: CREATE_TEST_ACCOUNT_SUCCESS,
  };
}
