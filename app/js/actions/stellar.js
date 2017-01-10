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
export function getOffersSuccess(offers) {
  return {
    type: actions.GET_OFFERS_SUCCESS,
    offers,
  };
}
export function getOffersStream(offer) {
  return {
    type: actions.GET_OFFERS_STREAM,
    offer,
  };
}
export function getOrderbook() {
  return {
    type: actions.GET_ORDERBOOK,
  };
}
export function getOrderbookSuccess(orderbook) {
  return {
    type: actions.GET_ORDERBOOK_SUCCESS,
    orderbook,
  };
}