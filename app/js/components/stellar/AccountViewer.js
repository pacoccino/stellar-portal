import React, { Component, PropTypes } from 'react';
import { Header, Divider } from 'semantic-ui-react'

import BalancesContainer from '../../containers/stellar/BalancesContainer';
import AccountActionsContainer from '../../containers/stellar/AccountActionsContainer';
import PaymentsViewer from '../../elements/PaymentsViewer';
import OffersViewer from '../../elements/OffersViewer';

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
        </div>
        <Divider />
        <BalancesContainer />
        <Divider />
        <AccountActionsContainer />
        <Divider />
        <PaymentsViewer />
        <Divider />
        <OffersViewer />
      </div>
    );
  }
}

AccountViewer.propTypes = {
  account: PropTypes.object,
};

export default AccountViewer;
