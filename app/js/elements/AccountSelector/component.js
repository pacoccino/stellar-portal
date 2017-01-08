import React, { Component, PropTypes } from 'react';
import { Button, Header, Input, Message } from 'semantic-ui-react'
import Clipboard from 'clipboard';

import * as StellarHelper from '../../helpers/StellarTools';

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountId: 'GDRFQGOPF7ZRRTA3WZXFICQLIOAV7NIC7AGG6SOMFKUMTK6PJ5PBPCR4',
      secretSeed: 'SDZXGOVIU5JQBGT3GRS2PPURLFDF6AODHY5MG4A7KNAORYX4ASR67GKN',
      pkError: null,
      seedError: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if(this.props.keypair !== newProps.keypair) {
      this.setState({
        accountId: newProps.keypair.accountId(),
        secretSeed: newProps.keypair.canSign() ? newProps.keypair.seed() : '',
      });
    }
  }

  componentDidMount() {
    this.getAccountFromSeed();
    new Clipboard(".account-address-copy")
  }

  handleChangePK(e) {
    e.preventDefault();
    const accountId = e.target.value || '';
    this.setState({ pkError: !StellarHelper.validPk(accountId) });
    this.setState({
      accountId,
    });
  };

  handleChangeSeed(e) {
    e.preventDefault();
    const secretSeed = e.target.value || '';
    // TODO isValidSeed ?
    this.setState({
      secretSeed,
    });
  };

  getAccountFromPk(e) {
    e && e.preventDefault();

    this.props.setAccount({ publicKey: this.state.accountId });
  };

  getAccountFromSeed(e) {
    e && e.preventDefault();

    this.props.setAccount({ secretSeed: this.state.secretSeed });
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h2">Account selector</Header>
        </div>
        <div>
          <Input
            action={{content: "Set", onClick: ::this.getAccountFromPk, loading: this.props.isAccountLoading}}
            input={{value: this.state.accountId}}
            onChange={::this.handleChangePK}
            placeholder='G...'
            label={{content: "Public key", className: 'AccountSelector-inputTitle'}}
            fluid
            error={this.state.pkError}
          />
          <Input
            action={{content: "Set", onClick: ::this.getAccountFromSeed, loading: this.props.isAccountLoading}}
            input={{value: this.state.secretSeed}}
            onChange={::this.handleChangeSeed}
            placeholder='S...'
            label={{content: "Secret seed", className: 'AccountSelector-inputTitle'}}
            fluid
            error={this.state.seedError}
          />
          <br/>
          {
            this.props.error ?
              <Message negative>
                <Message.Header>Account error</Message.Header>
                <p>There was an error while fetching this account's data.</p>
              </Message>
              :
              null
          }
          {this.props.keypair ?
            <div>

              <Button
                className="account-address-copy"
                basic
                color="green"
                data-clipboard-text={this.props.keypair.accountId()}
              >Copy public address</Button>
              {this.props.keypair.canSign() ?
                <Button
                  className="account-address-copy"
                  basic
                  color="blue"
                  data-clipboard-text={this.props.keypair.seed()}
                >Copy private address</Button>
                : null
              }
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

AccountSelector.propTypes = {
  isAccountLoading: PropTypes.bool,
  account: PropTypes.object,
  error: PropTypes.object,
  keypair: PropTypes.object,
  setAccount: PropTypes.func.isRequired,
};

export default AccountSelector;
