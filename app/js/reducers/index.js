import { combineReducers } from 'redux';

import { ACCOUNT_STATE_KEY, STELLAR_STATE_KEY } from '../constants/reducerKeys';

import account from './account';
import stellar from './stellar';

const reducers = combineReducers({
  [ACCOUNT_STATE_KEY]: account,
  [STELLAR_STATE_KEY]: stellar,
});

export default reducers;
