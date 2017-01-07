import { selectProperty } from '../helpers/redux';
import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY } from '../constants/reducerKeys';

export const getAccountData = selectProperty([ACCOUNT_STATE_KEY, 'data']);