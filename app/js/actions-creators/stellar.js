import * as StellarOperations from '../helpers/StellarOperations';

import { newStream } from '../helpers/monoStreamer';
import {
  ASYNC_SEND_OPERATION,
  ASYNC_CREATE_TRUSTLINE,
  ASYNC_GET_ORDERBOOK,
  ASYNC_CREATE_OFFER,
} from '../constants/asyncActions';
import { AsyncActions } from '../helpers/asyncActions';
import { getAuthData } from '../selectors/account';
import { AssetInstance } from '../helpers/StellarTools';
import * as StellarServer from '../helpers/StellarServer';
import * as StellarActions from '../actions/stellar';
import * as UiActions from '../actions/ui';

const sendOperation = (transaction, dispatch) => {
  dispatch(AsyncActions.startFetch(ASYNC_SEND_OPERATION));

  return transaction
    .then((d) => {
      dispatch(AsyncActions.successFetch(ASYNC_SEND_OPERATION, d, true));
    })
    .catch((error) => {
      dispatch(AsyncActions.errorFetch(ASYNC_SEND_OPERATION, error));
      dispatch(UiActions.openErrorModal(error));
    });
};

export const sendPayment = paymentData => (dispatch, getState) => {
  const authData = getAuthData(getState());
  return sendOperation(StellarOperations.sendPayment(paymentData, authData), dispatch);
};

export const sendPathPayment = paymentData => (dispatch, getState) => {
  const authData = getAuthData(getState());
  return sendOperation(StellarOperations.sendPathPayment(paymentData, authData), dispatch);
};

export const sendIssuePayment = formData => (dispatch, getState) => {
  const authData = getAuthData(getState());
  const { accountId, asset_code, amount, destination } = formData;
  const asset = { asset_code, asset_issuer: accountId };
  const paymentData = {
    asset,
    amount,
    destination,
  };
  return sendOperation(StellarOperations.sendPayment(paymentData, authData), dispatch);
};

export const sendCreateAccount = accountData => (dispatch, getState) => {
  const authData = getAuthData(getState());
  return sendOperation(StellarOperations.createAccount(accountData, authData), dispatch);
};

export const sendAccountMerge = accountData => (dispatch, getState) => {
  const authData = getAuthData(getState());
  return sendOperation(StellarOperations.accountMerge(accountData, authData), dispatch);
};

const changeTrust = ({ asset, limit }) => (dispatch, getState) => {
  const authData = getAuthData(getState());
  if (!authData) return Promise.reject();

  const transactionData = {
    asset,
    limit,
  };

  return StellarOperations
    .changeTrust(transactionData, authData)
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
    });
};

export const createTrustline = asset => (dispatch) => {
  dispatch(AsyncActions.startLoading(ASYNC_CREATE_TRUSTLINE));

  dispatch(changeTrust({ asset, limit: null }))
    .then(() => {
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_TRUSTLINE));
    })
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_TRUSTLINE));
    });
};

export const deleteTrustline = asset => (dispatch) => {
  dispatch(UiActions.deletingTrustline(asset));

  dispatch(changeTrust({ asset, limit: 0 }))
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
    });
};

export const createOffer = offer => (dispatch, getState) => {
  dispatch(AsyncActions.startLoading(ASYNC_CREATE_OFFER));
  const authData = getAuthData(getState());
  if (!authData) return Promise.reject();

  return StellarOperations
    .manageOffer(offer, authData)
    .then(() => {
      dispatch(AsyncActions.stopLoading(ASYNC_CREATE_OFFER, true));
    })
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
    });
};

export const deleteOffer = offer => (dispatch, getState) => {
  dispatch(UiActions.deletingOffer(offer));

  const authData = getAuthData(getState());
  if (!authData) return Promise.reject();

  const transactionData = {
    ...offer,
    amount: 0,
  };

  return StellarOperations
    .manageOffer(transactionData, authData)
    .then(() => true)
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
    });
};

export const setOrderbook = ({ selling, buying }) => (dispatch) => {
  dispatch(AsyncActions.startFetch(ASYNC_GET_ORDERBOOK));

  // TODO move to middleware
  newStream('orderbook',
    StellarServer
      .OrderbookStream({ selling, buying }, (orderbook) => {
        dispatch(AsyncActions.successFetch(ASYNC_GET_ORDERBOOK, orderbook));
      }),
  );
  return true;
};

export const getDestinationTrustlines = accountId => (dispatch) => {
  StellarServer.getAccount(accountId)
    .then(account => account.balances.map(balance => ({
      asset_type: balance.asset_type,
      asset_code: balance.asset_code,
      asset_issuer: balance.asset_issuer,
    })).map(AssetInstance))
    .then(trustlines => dispatch(StellarActions.setDestinationTrustlines(trustlines)));
};
