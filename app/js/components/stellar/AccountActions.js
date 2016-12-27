import React, { Component, PropTypes } from 'react';
import { Header } from 'semantic-ui-react'

import PaymentContainer from '../../containers/stellar/PaymentContainer';

class AccountActions extends Component {
  render() {
    if (!this.props.account) return null;

    return (
      <div>
        <Header as="h2">
          Actions
        </Header>
        <PaymentContainer />
      </div>
    );
  }
}

AccountActions.propTypes = {
  account: PropTypes.object,
};

export default AccountActions;
