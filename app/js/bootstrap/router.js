import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import store from './store';

import Layout from '../components/Layout';
import * as routes from '../constants/routes';

import AppMode from '../elements/AppMode';
// import NotFound from '../components/views/NotFound';

import OffersView from '../components/views/OffersView';
import ConsumeView from '../components/views/ConsumeView';
import BalancesView from '../components/views/BalancesView';

import * as AccountManager from '../helpers/AccountManager';
import { accountSet, canSign, isAccountLoading } from '../selectors/account';

const history = syncHistoryWithStore(browserHistory, store);

const RouterContainer = ({ isAccountLoading, accountSet, canSign }) =>
  <Router history={history}>
    <Route component={Layout}>
      <Dimmer inverted active={isAccountLoading}>
        <Loader inverted active={isAccountLoading} />
      </Dimmer>

      {
        accountSet ?
          <div>
            <Route
              path={routes.Offers}
              component={OffersView}
            />
            <Route
              path={routes.Consume}
              component={ConsumeView}
            />
            <Route
              path={routes.Balances}
              component={BalancesView}
            />
            <Redirect from="*" to={routes.Balances} />
          </div>
          :
          <div>
            <Route
              path={routes.Root}
              component={AppMode}
              onEnter={AccountManager.onPageLoad}
            />
            <Redirect from="*" to="/" />
          </div>
      }

    </Route>
  </Router>;


const mapStateToProps = state => ({
  accountSet: accountSet(state),
  canSign: canSign(state),
  isAccountLoading: isAccountLoading(state),
});

export default connect(mapStateToProps, null)(RouterContainer);
