import * as StellarOperations from '../helpers/StellarOperations';

import { newStream } from '../helpers/monoStreamer';
import { getAuthData } from '../selectors/account';
import { AssetInstance } from '../helpers/StellarTools';
import * as StellarServer from '../helpers/StellarServer';
import * as StellarActions from '../actions/stellar';
import * as UiActions from '../actions/ui';

const sendOperation = (transaction, dispatch) => {
  dispatch(UiActions.sendingPayment());

  return transaction
    .then((d) => {
      dispatch(UiActions.sendPaymentSuccess(d));
    })
    .catch((error) => {
      dispatch(UiActions.sendPaymentError(error));
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
  const{ accountId, asset_code, amount, destination } = formData;
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
  if(!authData) return Promise.reject();

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
  dispatch(UiActions.creatingTrustline(asset));

  dispatch(changeTrust({ asset, limit: null }))
    .then(() => {
      dispatch(UiActions.creatingTrustlineSuccess());
    })
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
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
  dispatch(UiActions.sendingOffer());
  const authData = getAuthData(getState());
  if(!authData) return Promise.reject();

  return StellarOperations
    .manageOffer(offer, authData)
    .then((d) => {
      dispatch(UiActions.sendOfferSuccess(d));
    })
    .catch((error) => {
      dispatch(UiActions.openErrorModal(error));
    });
};

export const deleteOffer = offer => (dispatch, getState) => {
  dispatch(UiActions.deletingOffer(offer));

  const authData = getAuthData(getState());
  if(!authData) return Promise.reject();

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
  dispatch(StellarActions.getOrderbook());

  // TODO move to middleware
  newStream('orderbook',
    StellarServer
      .OrderbookStream({ selling, buying }, (orderbook) => {
        dispatch(StellarActions.getOrderbookSuccess(orderbook));
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
