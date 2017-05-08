import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react';

import AccountSelector from '../../elements/StellarContainers/AccountSelector';

import logo from '../../../../content/assets/images/stellarportal.png';

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
  paragraphE: {
    fontSize: '1.4rem',
    padding: '0.6rem',
    color: 'white',
  },
  link: {
    color: '#50a4f5',
    fontWeight: 600,
  },
  description: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
  },
  subtitle: {
    fontSize: '2.5rem',
    color: 'white',
    fontWeight: 400,
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  screen: {
    height: '32rem',
  },
  featuresItem: {
    fontSize: '1.3rem',
    color: 'white',
    fontWeight: 300,
  },
};

class WelcomeScreen extends Component {
  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-container-overlay" />
        <Container textAlign="center">
          <img src={logo} style={styles.logo} className="welcome-logo" alt="welcome" />
          <Header style={styles.title}>
            Stellar Portal
          </Header>
          <p style={styles.paragraph}>
            Stellar Portal is a web app designed to access the
            &nbsp;<a style={styles.link} href="https://www.stellar.org/">Stellar Network</a>.
            <br />
            It allows you to consult account informations such as balances and offers,
            see orderbook and to make transactions.
            <br />
            This application relies <b>exclusively</b> on <a style={styles.link} href="https://www.stellar.org/developers/reference">Horizon API</a>.
          </p>
          <p style={styles.paragraphE}>
            Give it a try by entering an account ID or a Seed to see it in action:
          </p>
          <div style={styles.description}>
            <Header style={styles.subtitle}>
              Features
            </Header>
            <List bulleted>
              <List.Item style={styles.featuresItem}>Balances view and edit trustlines</List.Item>
              <List.Item style={styles.featuresItem}>Send payments</List.Item>
              <List.Item style={styles.featuresItem}>Issue assets</List.Item>
              <List.Item style={styles.featuresItem}>Create/Merge accounts</List.Item>
              <List.Item style={styles.featuresItem}>Account offers view and edit</List.Item>
              <List.Item style={styles.featuresItem}>List of payments</List.Item>
              <List.Item style={styles.featuresItem}>Watch orderbooks</List.Item>
            </List>
          </div>
        </Container>
      </div>
    );
  }
}

export default WelcomeScreen;
