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
import { getLocalAccounts, addLocalAccount } from '../helpers/AccountManager';
import { getKeypair, getAccounts } from '../selectors/account';
import { getNetwork } from '../selectors/stellarData';

export const setAccount = keys => (dispatch, getState) => {
  dispatch(AsyncActions.startFetch(ASYNC_FETCH_ACCOUNT));

  const keypair = KeypairInstance(keys);
  const network = getNetwork(getState());

  return getAccount(keypair.publicKey())
    .then((account) => {
      dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, account));
      dispatch(AccountActions.setKeypair(keypair));
      dispatch(AccountActions.addAccount(keypair));
      addLocalAccount(keypair);

      const putSecret = (keypair.canSign() && process.env.NODE_ENV === 'development');
      // TODO set real route to /accounts/:id
      const query = {
        accountId: putSecret ? undefined : keypair.publicKey(),
        secretSeed: putSecret ? keypair.secret() : undefined,
        network,
      };
      dispatch(push({ query }));

      return account;
    })
    .catch((error) => {
      dispatch(AsyncActions.errorFetch(ASYNC_FETCH_ACCOUNT, error));
      dispatch(push({ location: routes.Root }));
    });
};

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

export const onPageLoad = nextState => (dispatch) => {
  const { location: { query } } = nextState;
  if (query.network) {
    dispatch(switchNetwork(query.network));
  }
  if (query.secretSeed) {
    const keypair = Keypair.fromSecret(query.secretSeed);
    dispatch(setAccount(keypair));
  }
  const localAccounts = getLocalAccounts();
  dispatch(AccountActions.addAccounts(localAccounts));
};

export const onChangeAccountRoute = nextState => (dispatch, getState) => {
  const state = getState();
  const currentKeypair = getKeypair(state);
  const { params: { id } } = nextState;

  if (!id) return;
  if (currentKeypair && currentKeypair.publicKey() === id) return;

  let keypair = Keypair.fromPublicKey(id);
  const localAccounts = getAccounts(state);
  const localAccount = localAccounts.find(a => (a.publicKey === id));
  const storedSecret = (localAccount && localAccount.secret);
  if (storedSecret) {
    keypair = Keypair.fromSecret(storedSecret);
  }
  dispatch(setAccount(keypair));
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

