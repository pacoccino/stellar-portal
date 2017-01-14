import React, { Component, PropTypes } from 'react';
import { Container, Grid, Header, Divider } from 'semantic-ui-react'

import AccountSelector from '../../elements/StellarContainers/AccountSelector';
import BalancesContainer from '../../elements/StellarContainers/Balances';
import PaymentsViewer from '../../elements/StellarContainers/PaymentsViewer';
import OffersViewer from '../../elements/StellarContainers/OffersViewer';
import OrderBook from '../../elements/StellarContainers/OrderBook';

export function PublicView() {
    return (
      <div>
        <AccountSelector />
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
            <Grid.Column>
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
}


export default PublicView;
