import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react';

import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';
import BalancesContainer from '../../elements/StellarContainers/Balances';
import Payment from '../../elements/StellarContainers/Payment';
import PaymentsViewer from '../../elements/StellarContainers/PaymentsViewer';
import OffersViewer from '../../elements/StellarContainers/OffersViewer';
import RegisterContainer from '../../elements/StellarContainers/RegisterContainer';
import AccountSelector from "../../elements/StellarContainers/AccountSelector";
import LoginContainer from "../../elements/StellarContainers/LoginContainer";

const LoginView = () => (
  <div className="pages-container">
    <AccountSelector />
  </div>
);

export default LoginView;
