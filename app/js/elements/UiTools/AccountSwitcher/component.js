import React, { PropTypes } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

import AccountId from '../../../components/stellar/AccountId';

class AccountSwitcher extends React.Component {
  render() {
    const { openAccountId, resetAccount, accounts, keypair } = this.props;

    const options = accounts.length ? accounts.map(a => ({
      value: a.publicKey(),
      text: AccountId.getAccountIdText(a.publicKey()),
    })) : [{ value: 'null', text: 'No accounts' }];

    if (!keypair || accounts.length === 0) {
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
        <Dropdown
          compact
          selection
          button
          color="blue"
          options={options}
          value={keypair && keypair.publicKey()}
          onChange={(e, d) => openAccountId(d.value)}
        />
      );
    }
  }
}

AccountSwitcher.propTypes = {
  accounts: PropTypes.array.isRequired,
  keypair: PropTypes.object,
  resetAccount: PropTypes.func.isRequired,
  openAccountId: PropTypes.func.isRequired,
};

export default AccountSwitcher;
