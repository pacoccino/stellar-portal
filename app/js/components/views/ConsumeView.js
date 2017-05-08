import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react';

import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';
import BalancesContainer from '../../elements/StellarContainers/Balances';
import Payment from '../../elements/StellarContainers/Payment';
import PaymentsViewer from '../../elements/StellarContainers/PaymentsViewer';
import OffersViewer from '../../elements/StellarContainers/OffersViewer';
import ConsumeContainer from '../../elements/StellarContainers/ConsumeContainer';

const ConsumeView = () => (
  <div className="pages-container">
    <ConsumeContainer />
  </div>
);

export default ConsumeView;
