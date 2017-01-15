/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'

import reducers from '../reducers';

import stellarStreamerMiddleware from '../middlewares/StellarStreamer';

const enhancer = compose(
  applyMiddleware(
    thunk,
    stellarStreamerMiddleware,
    routerMiddleware(browserHistory),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  reducers,
  enhancer
);

export default store;
