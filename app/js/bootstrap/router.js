import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

import Layout from '../components/Layout';
import * as routes from '../constants/routes';

import AppMode from '../elements/AppMode';
// import NotFound from '../components/views/NotFound';
import Desktop from '../components/views/Desktop';

import * as AccountManager from '../helpers/AccountManager';

const history = syncHistoryWithStore(browserHistory, store);

const RouterContainer = () =>
  <Router history={history}>
    <Route component={Layout}>
      <Route
        path={routes.Root}
        component={AppMode}
        onEnter={AccountManager.onPageLoad}
      />
      <Route
        path={routes.Desktop}
        component={Desktop}
      />

      <Redirect from="*" to="/" />
    </Route>
  </Router>;

export default RouterContainer;
