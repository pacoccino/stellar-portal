import React, { Component, PropTypes } from 'react';
import { Header, Input, Message } from 'semantic-ui-react'

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountId: 'GDRFQGOPF7ZRRTA3WZXFICQLIOAV7NIC7AGG6SOMFKUMTK6PJ5PBPCR4',
      secretSeed: 'SAQMJYBPNZX545E3QY7MXNEDT6LF4CSHCGV4QWNKLDGQNXBT5KD2JW2W',
    };
  }

  componentWillReceiveProps(newProps) {
    if(this.props.account.accountId !== newProps.account.accountId) {
      this.setState({accountId: newProps.account.accountId});
    }
  }

  componentDidMount() {
    this.props.getAccount(this.state.accountId);
    this.props.setSeed(this.state.secretSeed);
  }

  handleChangePK = e => {
    e.preventDefault();
    const accountId = e.target.value || '';
    this.setState({
      accountId,
    });
  };

  handleChangeSeed = e => {
    e.preventDefault();
    const secretSeed = e.target.value || '';
    this.setState({
      secretSeed,
    });
  };

  setPublicKey = e => {
    e.preventDefault();

    this.props.getAccount(this.state.accountId);
  };

  setPrivateKey = e => {
    e.preventDefault();

    this.props.setSeed(this.state.secretSeed);
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h2">Account selector</Header>
        </div>
        <div>
          <Input
            action={{content: "Set", onClick:this.setPublicKey, loading: this.props.account.isLoading}}
            input={{value: this.state.accountId}}
            onChange={this.handleChangePK}
            placeholder='G...'
            label="Public key"
            fluid
          />
          <Input
            action={{content: "Set", onClick:this.setPrivateKey, loading: this.props.account.isLoading}}
            input={{value: this.state.secretSeed}}
            onChange={this.handleChangeSeed}
            placeholder='S...'
            label="Secret seed"
            fluid
          />
          <br/>
          {
            this.props.account.error ?
              <Message negative>
                <Message.Header>Invalid address</Message.Header>
                <p>The address you entered is not valid</p>
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
  getAccount: PropTypes.func.isRequired,
  setSeed: PropTypes.func.isRequired,
};

export default AccountSelector;
