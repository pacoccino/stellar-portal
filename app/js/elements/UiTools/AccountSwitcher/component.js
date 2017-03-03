import React, { PropTypes } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

class AccountSwitcher extends React.Component {
  render() {
    const { resetAccount, accounts } = this.props;

    if (accounts.length === 0) {
      return (
        <Button
          primary compact
          icon="add"
          onClick={resetAccount}
          content="Add account"
        />
      );
    } else {
      return (
        <Dropdown></Dropdown>
      );
    }
  }
}

AccountSwitcher.propTypes = {
  accounts: PropTypes.array.isRequired,
  keypair: PropTypes.object,
  resetAccount: PropTypes.func.isRequired,
};

export default AccountSwitcher;
