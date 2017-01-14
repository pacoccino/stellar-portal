import React, { Component, PropTypes } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react'

import AccountSelector from '../../elements/StellarContainers/AccountSelector';
import OrderBook from '../../elements/StellarContainers/OrderBook';

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container text textAlign="center">
        <Header as="h1">
          Stellar Portal
        </Header>
        <p>
          Stellar Portal is a decentralized web app to use the Stellar Network.
          It allows you to consult public data such as account and marker data, and to make transactions.
        </p>
        <p>
          This application is purely frontend, everything runs on your browser and there is no server except Horizon API.
        </p>
        <p>
          First enter an account ID to see its data, or a seed if you want to act with it.
        </p>
        <AccountSelector />
      </Container>
    );
  }
}

export default WelcomeScreen;
