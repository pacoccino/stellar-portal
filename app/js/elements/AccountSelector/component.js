import React, { Component, PropTypes } from 'react';
import { Container, Button, Header, Input, Message } from 'semantic-ui-react'
import Clipboard from 'clipboard';

import * as StellarHelper from '../../helpers/StellarTools';

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountId: '',
      secretSeed: '',
      pkError: null,
      seedError: null,
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
    this.setState({ seedError: !StellarHelper.validSeed(secretSeed) });
    this.setState({
      secretSeed,
    });
  };

  getAccountFromPk(e) {
    e && e.preventDefault();
    if(!this.state.accountId) return;

    this.props.setAccount({ publicKey: this.state.accountId }, this.context.router);
  };

  getAccountFromSeed(e) {
    e && e.preventDefault();
    if(!this.state.secretSeed) return;

    this.props.setAccount({ secretSeed: this.state.secretSeed }, this.context.router);
  };

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h2">Account selector</Header>
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
                <p>Either the account does not exists or you are on the wrong network. Try to switch to public/testnet.</p>
              </Message>
              :
              null
          }
          {this.props.keypair ?
            <div>

              <Button
                className="account-address-copy"
                basic
                icon="clipboard"
                content="Copy public address"
                color="green"
                data-clipboard-text={this.props.keypair.accountId()}
              />
              {this.props.keypair.canSign() ?
                <Button
                  className="account-address-copy"
                  basic
                  icon="clipboard"
                  content="Copy private address"
                  color="blue"
                  data-clipboard-text={this.props.keypair.seed()}
                />
                : null
              }
            </div>
            : null
          }
          {
            this.props.network === 'test' &&
            <Button
              basic
              icon="wizard"
              content="Create new test account"
              color="green"
              loading={this.props.isCreatingTestAccount}
              onClick={this.props.createTestAccount}
            />
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

AccountSelector.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default AccountSelector;
