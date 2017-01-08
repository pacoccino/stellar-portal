export const OPEN_ERROR_MODAL = 'modal:error:open';
export const CLOSE_ERROR_MODAL = 'modal:error:close';
export const SEND_PAYMENT = 'payment:send:fetching';
export const SEND_PAYMENT_SUCCESS = 'payment:send:success';

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

export function sendingPayment() {
  return {
    type: SEND_PAYMENT,
  };
}

export function sendPaymentSuccess(data) {
  return {
    type: SEND_PAYMENT_SUCCESS,
    data
  };
}
