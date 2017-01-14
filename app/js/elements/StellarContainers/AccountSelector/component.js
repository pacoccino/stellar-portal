import React, { Component, PropTypes } from 'react';
import { Table, Container, Button, Header, Input, Message } from 'semantic-ui-react'
import Clipboard from 'clipboard';

import * as StellarHelper from '../../../helpers/StellarTools';

const styles = {
  inputContainer: {
    width: '720px',
    maxWidth: '90%',
    margin: 'auto',
  },
};

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address: '',
      keypair: null,
      showSeed: false
    };
    if(this.props.keypair) {
      this.state.accountId = this.props.keypair.accountId();
      this.state.secretSeed = this.props.keypair.canSign() ? this.props.keypair.seed() : '';
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.keypair !== newProps.keypair) {
      if(newProps.keypair) {
        this.setState({
          accountId: newProps.keypair.accountId(),
          secretSeed: newProps.keypair.canSign() ? newProps.keypair.seed() : '',
        });
      } else {
        this.setState({
          accountId: '',
          secretSeed: '',
        });
      }
    }
  }

  componentDidMount() {
    new Clipboard(".account-address-copy");
  }

  getKeypair() {
    const address = this.state.address;
    const isPk = StellarHelper.validPk(address);
    const isSeed = StellarHelper.validSeed(address);

    let keypair = null;
    if(isPk) {
      keypair = StellarHelper.KeypairInstance({ publicKey: address });
    }
    if(isSeed) {
      keypair = StellarHelper.KeypairInstance({ secretSeed: address });
    }

    return keypair;
  }

  handleAddress(e) {
    const address = e.target.value || '';
    this.setState({
      address,
    }, () => {
      const keypair = this.getKeypair();
      this.setState({ keypair });
    });
  };

  handleSet(e) {
    e.preventDefault();
    const keypair = this.state.keypair;
    if(!keypair) return;

    this.props.setAccount(keypair);
  }

  newForm() {
    let buttonLabel = 'Invalid address';
    let buttonContent = 'Go';
    let buttonColor = 'red';
    let disabled = true;
    if(this.state.keypair) {
      buttonColor = 'green';
      disabled = false;
      if(this.state.keypair.canSign()) {
        buttonLabel = 'Seed';
      } else {
        buttonLabel = 'Public address';
      }
    } else {
      if(!this.state.address) {
        buttonLabel = 'No address';
      }
    }
    return (
      <div style={styles.inputCntainer}>
        <Input
          input={{value: this.state.address}}
          onChange={::this.handleAddress}
          placeholder='Please enter an account ID or Seed.'
          error={!!this.state.address && !this.state.keypair}
          label={{content: buttonLabel, width: 3, size: 'large', className: 'AccountSelector-inputTitle'}}
          fluid
          action={{
            color: buttonColor,
            icon: "sign in",
            disabled: disabled,
            content: buttonContent,
            onClick: ::this.handleSet,
            loading: this.props.isAccountLoading
          }}
        />

      </div>
    );
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          {this.newForm()}
          <br/>
          {
            this.props.error ?
              <Message negative>
                <Message.Header>Account error</Message.Header>
                <p>There was an error while fetching this account's data.</p>
                <p>Either the account does not exists or you are on the wrong network. Try to switch to public/testnet.</p>
              </Message>
              :
              null
          }
          {
            this.props.network === 'test' &&
            <div>
              <p style={{color: 'white'}}>
                Or
              </p>
              <Button
                icon="wizard"
                content="Create new test account"
                color="green"
                loading={this.props.isCreatingTestAccount}
                onClick={this.props.createTestAccount}
              />
            </div>
          }
        </Container>
      </div>
    );
  }
}

AccountSelector.propTypes = {
  isAccountLoading: PropTypes.bool,
  isCreatingTestAccount: PropTypes.bool,
  account: PropTypes.object,
  error: PropTypes.object,
  keypair: PropTypes.object,
  setAccount: PropTypes.func.isRequired,
  network: PropTypes.string.isRequired,
};

export default AccountSelector;
