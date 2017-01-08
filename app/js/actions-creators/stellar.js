import * as StellarOperations from '../helpers/StellarOperations';

import * as AccountActions from '../actions/account';
import { getAuthData } from '../helpers/selector';

export const sendPayment = formData => (dispatch, getState) => {
  dispatch(AccountActions.sendingPayment());

  const authData = getAuthData(getState());
  const { asset, amount, destination, asset_destination, amount_destination } = formData;
  const paymentData = {
    asset,
    amount,
    destination,
    asset_destination,
    amount_destination
  };

  let promise = null;
  if(asset_destination && amount_destination) {
    promise = StellarOperations.sendPathPayment(paymentData, authData);
  } else {
    promise = StellarOperations.sendPayment(paymentData, authData);
  }

  return promise
    .catch(error =>
      dispatch(AccountActions.sendPaymentError(error))
    )
    .then(d => {
      dispatch(AccountActions.sendPaymentSuccess(d));
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
    .changeTrust(transactionData, authData); // TODO receive
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
    .manageOffer(offer, authData); // TODO receive
};

export const deleteOffer = offer => (dispatch, getState) => {

  const authData = getAuthData(getState());
  if(!authData) return;

  const transactionData = {
    ...offer,
    amount: 0
  };

  return StellarOperations
    .manageOffer(transactionData, authData); // TODO receive
};
