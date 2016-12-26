/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

import stellarMiddleware from '../middlewares/stellar';

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

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
