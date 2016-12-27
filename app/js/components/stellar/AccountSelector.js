import React, { Component, PropTypes } from 'react';
import { Header, Input } from 'semantic-ui-react'

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountId: ''
    };
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
          <Input action={{content: "Set", onClick:this.handleSubmit}} onChange={this.handleChange} placeholder='GDRFXXX...' />
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
