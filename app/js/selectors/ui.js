import { selectProperty } from '../helpers/redux';
import { UI_STATE_KEY } from '../constants/reducerKeys';

export const getDestinationTrustlines = selectProperty([UI_STATE_KEY, 'destinationTruslines'], []);


export const isModalKeypairOpen = selectProperty([UI_STATE_KEY, 'modalKeypair'], false);
export const getModalErrorOpen = selectProperty([UI_STATE_KEY, 'errorOpen'], false);
export const getModalErrorData = selectProperty([UI_STATE_KEY, 'errorData'], '');

export const isSendingPayment = selectProperty([UI_STATE_KEY, 'sendingPayment'], false);
export const isSendingOffer = selectProperty([UI_STATE_KEY, 'sendingOffer'], false);
export const isCreatingTrustline = selectProperty([UI_STATE_KEY, 'creatingTrustline'], false);
