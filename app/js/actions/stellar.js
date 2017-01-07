import * as actions from '../constants/actionTypes';

export function getPaymentsSuccess(payments) {
  return {
    type: actions.GET_PAYMENTS_SUCCESS,
    payments,
  };
}
export function getPaymentsStream(payment) {
  return {
    type: actions.GET_PAYMENTS_STREAM,
    payment,
  };
}
export function getOffersStream(offer) {
  return {
    type: actions.GET_OFFERS_STREAM,
    offer,
  };
}