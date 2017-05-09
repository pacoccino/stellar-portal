import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react';

import dexLogo from '../../../../content/assets/images/dex-logo.png';
import secureImg from '../../../../content/assets/images/SECURE.png';
import privateImg from '../../../../content/assets/images/PRIVATE.png';
import decentralizedImg from '../../../../content/assets/images/DECENTRALIZED.png';

const styles = {
  logo: {
    height: '8rem',
    marginTop: '50px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.2rem',
    color: 'white',
    fontWeight: 300,
    paddingTop: '0.5rem',
    paddingBottom: '2.5rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.4rem',
    maxWidth: '800px',
    color: 'white',
    fontWeight: 300,
    paddingTop: '0.5rem',
    paddingBottom: '2.5rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  three: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '30px',
  },
  one: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '230px',
    textAlign: 'center',
    marginLeft: '30px',
    marginRight: '30px',
  },
  oneTitle: {
    fontSize: '1.3rem',
    color: 'white',
    fontWeight: 800,
    paddingTop: '2rem',
    paddingBottom: '1.5rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  oneText: {
    fontSize: '1rem',
    color: 'white',
    fontWeight: 400,
    paddingTop: '0.5rem',
    paddingBottom: '1.3rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  oneImage: {
    width: '125px',
  },
};

class WelcomeScreen extends Component {
  render() {
    return (
      <div className="welcome-container">
        <img src={dexLogo} style={styles.logo} className="welcome-logo" alt="welcome" />
        <p style={styles.title}>
          Decentralized Exchange
        </p>
        <p style={styles.subtitle}>
          Dex is a p2p exchange designed for the Stellar Network. <br/>
          It allows you to buy and sell verified assets
        </p>
        <div style={styles.three}>
          <div style={styles.one}>
            <img src={secureImg} style={styles.oneImage} alt="welcome" />
            <div style={styles.oneTitle}>
              SECURE
            </div>
            <div style={styles.oneText}>
              Entire exchange continually audited and inspected for unusual activity
            </div>
            <div style={styles.oneText}>
              Two-factor authentication available for your protection
            </div>
          </div>

          <div style={styles.one}>
            <img src={decentralizedImg} style={styles.oneImage} alt="welcome" />
            <div style={styles.oneTitle}>
              decentralized
            </div>
            <div style={styles.oneText}>
              ENtire exchange continually
              audited and inspected
              for unusual activity
            </div>
            <div style={styles.oneText}>
              Two-factor authentication
              available for your protection
            </div>
          </div>

          <div style={styles.one}>
            <img src={privateImg} style={styles.oneImage} alt="welcome" />
            <div style={styles.oneTitle}>
              private
            </div>
            <div style={styles.oneText}>
              we concerned about your privacy for this reason all your data will be protected with high level of encription
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
