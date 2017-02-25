import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

class AccountSwitcher extends React.Component {
  render() {
    const{ resetAccount } = this.props;

    return(
      <Button
        primary compact
        icon="user"
        onClick={resetAccount}
        content="Change account"
      />
    );
  }
}

AccountSwitcher.propTypes = {
  resetAccount: PropTypes.func.isRequired,
};

export default AccountSwitcher;
