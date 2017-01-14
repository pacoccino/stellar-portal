import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react'

class AccountSwitcher extends React.Component {
  render() {
    const { resetAccount } = this.props;

    return (
      <Button
        onClick={resetAccount}
      >
        Change account
      </Button>
    );
  }
}

AccountSwitcher.propTypes = {
  resetAccount: PropTypes.func.isRequired,
};

export default AccountSwitcher;
