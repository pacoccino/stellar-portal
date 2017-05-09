import React from 'react';
import { Header, Grid, Divider } from 'semantic-ui-react';

import SendLumens from '../../elements/StellarContainers/SendLumens';
import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';

const AccountView = () => (
  <div className="pages-container">
    <Header as="h2" textAlign="center">
      Deposit
    </Header>
    <CurrentAccount />
    <Divider />
    <SendLumens />
  </div>
);

export default AccountView;
