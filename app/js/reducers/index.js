import { combineReducers } from 'redux';

import account from './account';
import stellar from './stellar';

const reducers = combineReducers({
  account,
  stellar,
});

export default reducers;
