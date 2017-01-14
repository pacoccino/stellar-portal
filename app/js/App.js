import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import Layout from './components/layout/Layout';
import store from './store/configureStore';
import * as routes from './constants/routes';

import AppMode from './elements/AppMode';

import * as AccountManager from './helpers/AccountManager';

AccountManager.setStore(store);

const history = syncHistoryWithStore(browserHistory, store);

const App = ({ messages }) =>
  <Provider store={store}>
      <Router history={history}>
        <Route component={Layout}>
          <Route
            path={routes.Root}
            component={AppMode}
            onEnter={AccountManager.onPageLoad}
          />
          <Redirect from="*" to="/" />
        </Route>
      </Router>
  </Provider>;

export default App;
