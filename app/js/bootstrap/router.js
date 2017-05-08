import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { history } from './store';

import Layout from '../components/Layout';
import * as routes from '../constants/routes';

// import NotFound from '../components/views/NotFound';

import OffersView from '../components/views/OffersView';
import ConsumeView from '../components/views/ConsumeView';
import BalancesView from '../components/views/BalancesView';
import RegisterView from '../components/views/RegisterView';
import LoginView from '../components/views/LoginView';
import WelcomeView from '../components/views/WelcomeView';

import * as AccountManager from '../helpers/AccountManager';
import { accountSet, canSign, isAccountLoading } from '../selectors/account';

const RouterContainer = ({ isAccountLoading, accountSet, canSign }) =>
  <ConnectedRouter history={history}>
    <Layout>
      {
        accountSet ?
          <Switch>
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
          </Switch>
          :
          <Switch>
            <Route
              path={routes.Root} exact
              component={WelcomeView}
            />
            <Route
              path={routes.Register}
              component={RegisterView}
            />
            <Route
              path={routes.Login}
              component={LoginView}
            />
            <Redirect from="*" to="/" />
          </Switch>
      }
    </Layout>
  </ConnectedRouter>;


const mapStateToProps = state => ({
  accountSet: accountSet(state),
  canSign: canSign(state),
  isAccountLoading: isAccountLoading(state),
});

export default connect(mapStateToProps, null)(RouterContainer);
