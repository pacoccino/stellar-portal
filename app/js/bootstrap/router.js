import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

import Layout from '../components/Layout';
import Welcome from '../components/views/WelcomeView';
import * as routes from '../constants/routes';

import AppMode from '../elements/AppMode';
// import NotFound from '../components/views/NotFound';
import Desktop from '../components/views/Desktop';
import { onPageLoad as onPageLoadAction, onChangeAccountRoute as onChangeAccountRouteAction } from '../actions-creators/account';

const history = syncHistoryWithStore(browserHistory, store);

const RouterContainer = ({ onPageLoad, onChangeAccountRoute }) =>
  <Router history={history}>
    <Route
      component={Layout}
      onEnter={onPageLoad}
      path={routes.Root}
    >
      <Route
        path={routes.Account}
        onEnter={onChangeAccountRoute}
      >
        <IndexRoute component={AppMode} />
      </Route>

      <Route
        path={routes.Desktop}
        component={Desktop}
      />

      <IndexRoute component={Welcome} />
      <Redirect from="*" to={routes.Root} />
    </Route>
  </Router>;

RouterContainer.propTypes = {
  onPageLoad: PropTypes.func.isRequired,
  onChangeAccountRoute: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onPageLoad: onPageLoadAction,
  onChangeAccountRoute: onChangeAccountRouteAction,
};

export default connect(null, mapDispatchToProps)(RouterContainer);
