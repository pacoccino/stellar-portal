export const OPEN_ERROR_MODAL = 'modal:error:open';
export const CLOSE_ERROR_MODAL = 'modal:error:close';
export const OPEN_KEYPAIR_MODAL = 'modal:keypair:open';
export const CLOSE_KEYPAIR_MODAL = 'modal:keypair:close';
export const DELETE_OFFER = 'offer:delete:fetching';
export const SEND_OFFER = 'offer:send:fetching';
export const SEND_OFFER_SUCCESS = 'offer:send:success';
export const DELETE_TRUSTLINE = 'trustline:delete:fetching';

export function openKeypairModal() {
  return {
    type: OPEN_KEYPAIR_MODAL,
  };
}
export function closeKeypairModal() {
  return {
    type: CLOSE_KEYPAIR_MODAL,
  };
}
export function openErrorModal(errorData) {
  return {
    type: OPEN_ERROR_MODAL,
    errorData,
  };
}
export function closeErrorModal() {
  return {
    type: CLOSE_ERROR_MODAL,
  };
}

export function deletingOffer(offer) {
  return {
    type: DELETE_OFFER,
    offer,
  };
}
export function sendingOffer() {
  return {
    type: SEND_OFFER,
  };
}

export function sendOfferSuccess(data) {
  return {
    type: SEND_OFFER_SUCCESS,
    data,
  };
}

export function deletingTrustline(trustline) {
  return {
    type: DELETE_TRUSTLINE,
    trustline,
  };
}
