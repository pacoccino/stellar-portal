import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Layout from '../components/layout/Layout';
import store from '../store/configureStore';
import * as routes from '../constants/routes';

import Main from '../components/views/Main';
import NotFound from '../components/views/NotFound';

const App = ({ messages }) =>
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route
            path={routes.Root}
            component={Main}
          />

          <Route
            path="*"
            component={NotFound}
          />
        </Route>
      </Router>
  </Provider>;

export default App;
