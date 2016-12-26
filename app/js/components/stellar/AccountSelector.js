import React, { Component, PropTypes } from 'react';

import BalancesContainer from '../../containers/stellar/BalancesContainer';
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
          <h2>Account selector</h2>
          <h3>
            {
              this.props.account.accountId ?
                `Viewing account ${this.props.account.accountId}`
                :
                "Please select an account to view"
            }
          </h3>
        </div>
        <BalancesContainer />
        <div>
          <label htmlFor="account-id">Account ID</label>
          <input name="account-id" type="text" value={this.state.accountId} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Set</button>
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
