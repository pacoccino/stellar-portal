import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react'

import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';
import BalancesContainer from '../../elements/StellarContainers/Balances';
import Payment from '../../elements/StellarContainers/Payment';
import PaymentsViewer from '../../elements/StellarContainers/PaymentsViewer';
import OffersViewer from '../../elements/StellarContainers/OffersViewer';
import OrderBook from '../../elements/StellarContainers/OrderBook';

const PrivateView = () => (
  <div>
    <CurrentAccount />
    <Divider />
    <Grid columns={2} divided doubling>
      <Grid.Row>
        <Grid.Column>
          <BalancesContainer />
        </Grid.Column>
        <Grid.Column>
          <Payment />
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column>
          <OffersViewer />
        </Grid.Column>
        <Grid.Column>
          <OrderBook />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Divider />
    <Container>
      <PaymentsViewer />
    </Container>
  </div>
);

export default PrivateView;