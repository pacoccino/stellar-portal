import React, { PropTypes } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

import AccountId from '../../../components/stellar/AccountId';

class AccountSwitcher extends React.Component {
  render() {
    const { openAccountId, resetAccount, accounts, keypair } = this.props;

    if (accounts.length === 0)
      return null;

    // TODO show list on welcome

    let options = accounts.map(a => ({
      value: a.publicKey(),
      text: AccountId.getAccountIdText(a.publicKey()),
    }));

    options = options.concat({
      value: 'null',
      text: 'Close account',
    });

    return (
      <Dropdown
        button
        color="blue"
        label="Select account"
        options={options}
        value={keypair ? keypair.publicKey() : null}
        onChange={(e, d) => openAccountId(d.value)}
      />
    );
  }
}

AccountSwitcher.propTypes = {
  accounts: PropTypes.array.isRequired,
  keypair: PropTypes.object,
  resetAccount: PropTypes.func.isRequired,
  openAccountId: PropTypes.func.isRequired,
};

export default AccountSwitcher;
