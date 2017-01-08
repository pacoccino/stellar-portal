import * as StellarOperations from '../helpers/StellarOperations';

import { getAuthData } from '../helpers/selector';
import * as UiActions from '../actions/ui';

export const sendPayment = formData => (dispatch, getState) => {
  dispatch(UiActions.sendingPayment());

  const authData = getAuthData(getState());
  const { asset, amount, destination } = formData;
  const paymentData = {
    asset,
    amount,
    destination,
  };

  return StellarOperations.sendPayment(paymentData, authData)
    .catch(error => {
      dispatch(UiActions.openErrorModal(error))
    })
    .then(d => {
      dispatch(UiActions.sendPaymentSuccess(d));
    });
};

export const sendPathPayment = formData => (dispatch, getState) => {
  dispatch(UiActions.sendingPayment());

  const authData = getAuthData(getState());
  const { asset_source, max_amount, destination, asset_destination, amount_destination } = formData;
  const paymentData = {
    asset_source,
    asset_destination,
    destination,
    max_amount,
    amount_destination
  };

  return StellarOperations.sendPathPayment(paymentData, authData)
    .catch(error =>
      dispatch(UiActions.openErrorModal(error))
    )
    .then(d => {
      dispatch(UiActions.sendPaymentSuccess(d));
    });
};

export const sendIssuePayment = formData => (dispatch, getState) => {
  dispatch(UiActions.sendingPayment());

  const authData = getAuthData(getState());
  const { accountId, asset_code, amount, destination } = formData;
  const asset = { asset_code, asset_issuer: accountId};
  const paymentData = {
    asset,
    amount,
    destination,
  };

  return StellarOperations.sendPayment(paymentData, authData)
    .catch(error =>
      dispatch(UiActions.openErrorModal(error))
    )
    .then(d => {
      dispatch(UiActions.sendPaymentSuccess(d));
    });
};

const changeTrust = ({ asset, limit }) => (dispatch, getState) => {
  const authData = getAuthData(getState());
  if(!authData) return;

  const transactionData = {
    asset,
    limit,
  };

  return StellarOperations
    .changeTrust(transactionData, authData)
    .catch(error => {
      dispatch(UiActions.openErrorModal(error))
    });
};

export const createTrustline = asset => (
  changeTrust({
    asset,
    limit: null,
  })
);
export const deleteTrustline = asset => (
  changeTrust({
    asset,
    limit: 0,
  })
);

export const createOffer = offer => (dispatch, getState) => {
  const authData = getAuthData(getState());
  if(!authData) return;

  return StellarOperations
    .manageOffer(offer, authData)
    .catch(error => {
      dispatch(UiActions.openErrorModal(error))
    });
};

export const deleteOffer = offer => (dispatch, getState) => {
  const authData = getAuthData(getState());
  if(!authData) return;

  const transactionData = {
    ...offer,
    amount: 0
  };

  return StellarOperations
    .manageOffer(transactionData, authData)
    .catch(error => {
      dispatch(UiActions.openErrorModal(error));
    });
};
