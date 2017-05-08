import { StellarServer, StellarTools, StellarAccountManager } from 'stellar-toolkit';
import { Keypair } from 'stellar-sdk';

import { AsyncActions } from '../helpers/asyncActions';
import * as AccountActions from '../actions/account';
import { ASYNC_FETCH_ACCOUNT, ASYNC_CREATE_TEST_ACCOUNT } from '../constants/asyncActions';

import { getNetwork } from '../selectors/stellarData';

import { federationCreate } from '../federation/index';
import { getStellarAddress } from './services';

const { getAccount, switchNetwork: switchNetworkInstance, generateTestPair } = StellarServer;
const { KeypairInstance } = StellarTools;



export const setAccount = keys => (dispatch, getState) => {
  dispatch(AsyncActions.startFetch(ASYNC_FETCH_ACCOUNT));

  const keypair = KeypairInstance(keys);

  return getAccount(keypair.publicKey())
    .then((account) => {
      dispatch(AsyncActions.successFetch(ASYNC_FETCH_ACCOUNT, account));
      dispatch(AccountActions.setKeypair(keypair));

      return account;
    })
    .catch(error => dispatch(AsyncActions.errorFetch(ASYNC_FETCH_ACCOUNT, error)));
};

export const resetAccount = () => (dispatch) => {
  dispatch(AccountActions.resetAccount());
};

export const switchNetwork = network => (dispatch, getState) => {
  const currentNetwork = getNetwork(getState());
  if (network === currentNetwork) return;

  dispatch(resetAccount());

  switchNetworkInstance(network);
  dispatch(AccountActions.switchNetwork(network));
};

export const createTestAccount = (e, { formData }) => (dispatch) => {
  e.preventDefault();
  dispatch(AsyncActions.startLoading(ASYNC_CREATE_TEST_ACCOUNT));

  const address = {
    street: formData["street"],
    nr: formData["address_nr"],
    city: formData["city"],
    postal_code: formData["postal_code"],
    country: formData["country"]
  };

  const account = {
    stellar_address : formData["user_name"],
    passport_nr : formData["passport_nr"],
    address : address,
    first_name : formData["first_name"],
    last_name : formData["last_name"],
    password: formData["password"]
  };

  generateTestPair()
    .then((newPair) => {
      console.log("Hello")
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_TEST_ACCOUNT));
      dispatch(setAccount(newPair));
      return federationCreate(account, newPair);
    })
    .catch(console.error);
};

export const login = ({ username, password }) => (dispatch) => {
  const stellar_address = getStellarAddress(username);

  return StellarTools.resolveAddress(stellar_address)
    .then(resolved => resolved.account_id)
    .then(publicKey => StellarServer.getAccount(publicKey))
    .then(account => {
      const isSeed = StellarTools.validSeed(password);
      let keypair;
      if (isSeed) {
        keypair = Keypair.fromSecret(password);
      } else {
        const seed = StellarAccountManager.extractSeed(account, password);
        keypair = Keypair.fromSecret(seed);
      }

      dispatch(AccountActions.setKeypair(keypair));

      return keypair;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};