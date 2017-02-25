import React from 'react';
import { Container, Grid, Divider } from 'semantic-ui-react';

import CurrentAccount from '../../elements/StellarContainers/CurrentAccount';
import BalancesContainer from '../../elements/StellarContainers/Balances';
import PaymentsViewer from '../../elements/StellarContainers/PaymentsViewer';
import OffersViewer from '../../elements/StellarContainers/OffersViewer';
import OrderBook from '../../elements/StellarContainers/OrderBook';

function PublicView() {
  return (
    <div className="pages-container">
      <CurrentAccount />
      <Divider />
      <Grid columns={2} divided doubling>
        <Grid.Row>
          <Grid.Column>
            <BalancesContainer />
          </Grid.Column>
          <Grid.Column>
            <OffersViewer />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column />
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
}

export default PublicView;
