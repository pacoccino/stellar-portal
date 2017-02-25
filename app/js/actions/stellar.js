export const GET_PAYMENTS_SUCCESS = 'stellar:payments:success';
export const GET_PAYMENTS_STREAM = 'stellar:payments:stream';
export const GET_OFFERS_SUCCESS = 'stellar:offers:success';
export const GET_OFFERS_STREAM = 'stellar:offers:stream';
export const GET_EFFECT_STREAM = 'stellar:effect:stream';

export const GET_ORDERBOOK = 'stellar:orderbook:fetching';
export const GET_ORDERBOOK_SUCCESS = 'stellar:orderbook:success';

export const SET_DESTINATION_TRUSTLINES = 'stellar:payment:desttrust';

export function getPaymentsSuccess(payments) {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payments,
  };
}

export function getPaymentsStream(payment) {
  return {
    type: GET_PAYMENTS_STREAM,
    payment,
  };
}
export function getOffersSuccess(offers) {
  return {
    type: GET_OFFERS_SUCCESS,
    offers,
  };
}
export function getOffersStream(offer) {
  return {
    type: GET_OFFERS_STREAM,
    offer,
  };
}
export function getEffectsStream(effect) {
  return {
    type: GET_EFFECT_STREAM,
    effect,
  };
}

export function setDestinationTrustlines(destinationTruslines) {
  return {
    type: SET_DESTINATION_TRUSTLINES,
    destinationTruslines,
  };
}
