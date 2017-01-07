/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import stellarMiddleware from '../middlewares/Stellar';

const enhancer = compose(
  applyMiddleware(
    thunk,
    stellarMiddleware,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  reducers,
  enhancer
);

export default store;
