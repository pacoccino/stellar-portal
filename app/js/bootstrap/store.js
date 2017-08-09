/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';
import { setStore } from '../helpers/AccountManager';
import stellarStreamerMiddleware from '../middlewares/StellarStreamer';
import asyncActionsMiddleware from '../helpers/asyncActions/middleware';

const enhancer = compose(
  applyMiddleware(
    thunk,
    stellarStreamerMiddleware,
    asyncActionsMiddleware,
    routerMiddleware(browserHistory),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const store = createStore(
  reducers,
  enhancer,
);

setStore(store);

export default store;
