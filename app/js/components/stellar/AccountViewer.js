import React, { Component, PropTypes } from 'react';
import { Header, Divider } from 'semantic-ui-react'

import BalancesContainer from '../../containers/stellar/BalancesContainer';

class AccountViewer extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  getNoAccount() {
    return (
      <Header as="h2">No account loaded</Header>
    );
  }

  render() {
    if (!this.props.account) return this.getNoAccount();

    return (
      <div>
        <div>
          <Header as="h2">Account viewer</Header>
          <Header as="h4">
            {`Viewing account ${this.props.account.account_id}`}
          </Header>
        </div>
        <Divider />
        <BalancesContainer />
      </div>
    );
  }
}

AccountViewer.propTypes = {
  account: PropTypes.object,
};

export default AccountViewer;
