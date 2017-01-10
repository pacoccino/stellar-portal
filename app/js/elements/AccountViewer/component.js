import React, { Component, PropTypes } from 'react';
import { Container, Grid, Header, Divider } from 'semantic-ui-react'

import BalancesContainer from '../Balances';
import Payment from '../Payment';
import PaymentsViewer from '../PaymentsViewer';
import OffersViewer from '../OffersViewer';
import OrderBooks from '../OrderBooks';

class AccountViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  getNoAccount() {
    return (
      <Header as="h2">No account loaded</Header>
    );
  }

  render() {
    if (!this.props.account) return this.getNoAccount();

    return (
      <div>
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
              <OrderBooks />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Container style={styles.paymentContainer}>
          <PaymentsViewer />
        </Container>
      </div>
    );
  }
}
const styles = {
  paymentContainer: {
    height: '50rem',
    overflowY: 'scroll',
    padding: '1rem 0',
  },
};

AccountViewer.propTypes = {
  account: PropTypes.object,
  canSign: PropTypes.bool,
};

export default AccountViewer;
