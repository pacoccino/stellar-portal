export const SWITCH_NETWORK = 'network:switch';

export const RESET_ACCOUNT = 'account:reset';
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
