import React, { Component, PropTypes } from 'react';
import { Container, Header } from 'semantic-ui-react'

import AccountSelector from '../../elements/StellarContainers/AccountSelector';

const styles = {
  logo: {
    height: '16rem',
  },
  title: {
    fontSize: '3.5rem',
    color: 'white',
    fontWeight: 400,
    paddingTop: '0.5rem',
    paddingBottom: '2.5rem',
  },
  paragraph: {
    fontSize: '1.3rem',
    padding: '0.6rem',
    color: 'white',
  },
  link: {
    color: '#50a4f5',
    fontWeight: 600,
  }
};

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-container-overlay" />
        <Container textAlign="center">
          <img src="/assets/images/stellarportal.png" style={styles.logo} className="welcome-logo"/>
          <Header style={styles.title}>
            Stellar Portal
          </Header>
          <p style={styles.paragraph}>
            Stellar Portal is a decentralized web app designed to access the <a style={styles.link} href="https://www.stellar.org/">Stellar Network</a>.
            <br/>
            It allows you to consult account informations such as balances and offers, see orderbook and to make transactions.
            <br/>
            This application relies <b>exclusively</b> on <a style={styles.link} href="https://www.stellar.org/developers/reference">Horizon API</a>.
          </p>
          <p style={styles.paragraph}>
            Give it a try by entering an account ID to see it in action:
          </p>
          <AccountSelector />
        </Container>
      </div>
    );
  }
}

export default WelcomeScreen;
