import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react';

import SendLumens from '../../elements/StellarContainers/SendLumens';
import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';

const AccountView = () => (
  <div className="pages-container">
    <CurrentAccount />
    <Divider />
    <SendLumens />
  </div>
);

export default AccountView;
