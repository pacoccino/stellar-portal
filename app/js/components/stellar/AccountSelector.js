import React, { Component, PropTypes } from 'react';
import { Header, Input, Message } from 'semantic-ui-react'

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountId: ''
    };
  }

  componentWillReceiveProps(newProps) {
    if(this.props.account.accountId !== newProps.account.accountId) {
      this.setState({accountId: newProps.account.accountId});
    }
  }

  handleChange = e => {
    e.preventDefault();
    const accountId = e.target.value || '';
    this.setState({
      accountId,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.setAccountId(this.state.accountId);
    this.setState({ accountId: '' });
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h2">Account selector</Header>
          <Header as="h4">
            {
              this.props.account.accountId ?
                `Viewing account ${this.props.account.accountId}`
                :
                "Please select an account to view"
            }
          </Header>
        </div>
        <div>
          <Input loading action={{content: "Set", onClick:this.handleSubmit, loading: this.props.account.isLoading}} input={{value: this.state.accountId}} onChange={this.handleChange} placeholder='GDRFXXX...' />
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
  setAccountId: PropTypes.func.isRequired,
};

export default AccountSelector;
