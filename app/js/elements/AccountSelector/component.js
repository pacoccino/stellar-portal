import React, { Component, PropTypes } from 'react';
import { Header, Input, Message } from 'semantic-ui-react'

import * as StellarHelper from '../../helpers/Stellar';

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
    if(this.props.account.keypair !== newProps.account.keypair) {
      this.setState({
        accountId: newProps.account.keypair.accountId(),
        secretSeed: newProps.account.keypair.canSign() ? newProps.account.keypair.seed() : '',
      });
    }
  }

  componentDidMount() {
    this.getAccountFromSeed();
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
            action={{content: "Set", onClick: ::this.getAccountFromPk, loading: this.props.account.isLoading}}
            input={{value: this.state.accountId}}
            onChange={::this.handleChangePK}
            placeholder='G...'
            label={{content: "Public key", className: 'AccountSelector-inputTitle'}}
            fluid
            error={this.state.pkError}
          />
          <Input
            action={{content: "Set", onClick: ::this.getAccountFromSeed, loading: this.props.account.isLoading}}
            input={{value: this.state.secretSeed}}
            onChange={::this.handleChangeSeed}
            placeholder='S...'
            label={{content: "Secret seed", className: 'AccountSelector-inputTitle'}}
            fluid
            error={this.state.seedError}
          />
          <br/>
          {
            this.props.account.error ?
              <Message negative>
                <Message.Header>Account error</Message.Header>
                <p>There was an error while fetching this account's data.</p>
              </Message>
              :
              null
          }
        </div>
      </div>
    );
  }
}

AccountSelector.propTypes = {
  account: PropTypes.object.isRequired,
  setAccount: PropTypes.func.isRequired,
};

export default AccountSelector;
