import { selectProperty } from '../helpers/redux';
import { asyncSelectorObject } from '../helpers/asyncActions/selectors';
import { UI_STATE_KEY } from '../constants/reducerKeys';
import { ASYNC_SEND_OPERATION, ASYNC_CREATE_TRUSTLINE } from '../constants/asyncActions';

export const getDestinationTrustlines = selectProperty([UI_STATE_KEY, 'destinationTruslines'], []);


export const isModalKeypairOpen = selectProperty([UI_STATE_KEY, 'modalKeypair'], false);
export const getModalErrorOpen = selectProperty([UI_STATE_KEY, 'errorOpen'], false);
export const getModalErrorData = selectProperty([UI_STATE_KEY, 'errorData'], '');

export const isSendingPayment = asyncSelectorObject(ASYNC_SEND_OPERATION).isLoading;
export const isCreatingTrustline = asyncSelectorObject(ASYNC_CREATE_TRUSTLINE).isLoading;

export const isSendingOffer = selectProperty([UI_STATE_KEY, 'sendingOffer'], false);
