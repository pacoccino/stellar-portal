import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

import AccountId from '../../../components/stellar/AccountId';

class AccountSwitcher extends React.Component {
  render() {
    const { openAccountId, accounts, keypair } = this.props;

    if (accounts.length === 0) {
      return null;
    }

    let currentId = 'null';
    if (keypair) {
      currentId = keypair.publicKey();
    }

    let options = accounts.map(a => ({
      value: a.publicKey(),
      text: AccountId.getAccountIdText(a.publicKey()),
    }));

    options = options.concat({
      value: 'null',
      text: keypair ? 'Close account' : 'No account selected',
    });

    return (
      <Dropdown
        selection
        button
        color="blue"
        label="Select account"
        options={options}
        value={currentId}
        onChange={(e, d) => openAccountId(d.value)}
      />
    );
  }
}

AccountSwitcher.propTypes = {
  accounts: PropTypes.array.isRequired,
  keypair: PropTypes.object,
  openAccountId: PropTypes.func.isRequired,
};

export default AccountSwitcher;
