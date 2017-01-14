import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react'

import AccountSelector from '../../elements/AccountSelector';
import BalancesContainer from '../../elements/Balances';
import Payment from '../../elements/Payment';
import PaymentsViewer from '../../elements/PaymentsViewer';
import OffersViewer from '../../elements/OffersViewer';
import OrderBook from '../../elements/OrderBook';

const PrivateView = () => (
  <div>
    <AccountSelector />
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