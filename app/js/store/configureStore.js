/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'

import reducers from '../reducers';

import stellarMiddleware from '../middlewares/Stellar';

const enhancer = compose(
  applyMiddleware(
    thunk,
    stellarMiddleware,
    routerMiddleware(browserHistory),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  reducers,
  enhancer
);

export default store;
