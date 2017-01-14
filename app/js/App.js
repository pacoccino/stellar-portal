import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Layout from './components/layout/Layout';
import store from './store/configureStore';
import * as routes from './constants/routes';

import AppMode from './elements/AppMode';
import NotFound from './components/views/NotFound';

import * as AccountManager from './helpers/AccountManager';

AccountManager.setStore(store);

const App = ({ messages }) =>
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route
            path={routes.Root}
            component={AppMode}
            onEnter={AccountManager.onPageLoad}
          />

          <Route
            path="*"
            component={NotFound}
          />
        </Route>
      </Router>
  </Provider>;

export default App;
