import { push } from 'react-router-redux';
import { Keypair } from 'stellar-sdk';

import { AsyncActions } from '../helpers/asyncActions';
import * as AccountActions from '../actions/account';
import { ASYNC_FETCH_ACCOUNT, ASYNC_CREATE_TEST_ACCOUNT } from '../constants/asyncActions';
import * as routes from '../constants/routes';

import {
  getAccount,
  switchNetwork as switchNetworkInstance,
  generateTestPair,
} from '../helpers/StellarServer';
import { KeypairInstance } from '../helpers/StellarTools';
import { getLocalAccounts } from '../helpers/storage';
import { getAccounts, getCurrentAccount } from '../selectors/account';
import { getNetwork } from '../selectors/stellarData';

const PROD = process.env.NODE_ENV === 'production';
export const resetAccount = () => (dispatch) => {
  dispatch(push({ query: {} }));
  dispatch(AccountActions.resetAccount());
};

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if (network === currentNetwork) return;

  dispatch(resetAccount());

  switchNetworkInstance(network);
  dispatch(AccountActions.switchNetwork(network));
};

export const addAccount = keypair => (dispatch) => {
  const newAccount = {
    id: keypair.publicKey(),
    keypair,
  };

  // TODO update existing : add seed, edit other fields ...
  // TODO add network into account
  dispatch(AccountActions.addAccount(newAccount));
};

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AsyncActions.startFetch(ASYNC_FETCH_ACCOUNT));

  const keypair = KeypairInstance(keys);
  const network = getNetwork(getState());

  return getAccount(keypair.publicKey())
    .then((stellarAccount) => {
      dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, stellarAccount));
      dispatch(resetAccount());
      dispatch(addAccount(keypair));
      dispatch(AccountActions.setCurrentAccountId(keypair.publicKey()));

      const putSecret = (keypair.canSign() && !PROD);
      const routeUpdate = {
        pathname: routes.Account_G(keypair.publicKey()),
        query: {
          secretSeed: putSecret ? keypair.secret() : undefined,
          network,
        },
      };
      dispatch(push(routeUpdate));

      return stellarAccount;
    })
    .catch((error) => {
      dispatch(AsyncActions.errorFetch(ASYNC_FETCH_ACCOUNT, error));
      dispatch(push(routes.Root));
      throw error;
    });
};

export const openAccountId = id => (dispatch, getState) => {
  const state = getState();
  const localAccounts = getAccounts(state);
  const currentAccount = getCurrentAccount(state);

  if (!id) return Promise.reject();
  if (id === 'null') { // TODO store constant or direct call reset
    return dispatch(resetAccount());
  }
  if (currentAccount && currentAccount.id === id) { return Promise.resolve(); }

  const localAccount = localAccounts.find(a => (a.id === id));

  let keypair = null;
  if (localAccount) {
    keypair = localAccount.keypair;
  } else {
    keypair = Keypair.fromPublicKey(id);
  }
  return dispatch(setAccount(keypair));
};

export const onPageLoad = nextState => (dispatch) => {
  // Retrieve stored accounts
  const localAccounts = getLocalAccounts();
  dispatch(AccountActions.addAccounts(localAccounts));

  const { location: { query } } = nextState;
  if (query.network) {
    dispatch(switchNetwork(query.network));
  }
};

export const onChangeAccountRoute = nextState => (dispatch) => {
  const { params: { id }, location: { action, query } } = nextState;
  if (action === 'PUSH') return; // Disable self-sent actions

  if (query.secretSeed) {
    const keypair = Keypair.fromSecret(query.secretSeed);
    dispatch(setAccount(keypair));
  } else {
    dispatch(openAccountId(id));
  }
};

export const createTestAccount = () => (dispatch) => {
  dispatch(AsyncActions.startLoading(ASYNC_CREATE_TEST_ACCOUNT));
  generateTestPair()
    .then((newPair) => {
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_TEST_ACCOUNT));
      dispatch(setAccount(newPair));
    })
    .catch(console.error);
};

