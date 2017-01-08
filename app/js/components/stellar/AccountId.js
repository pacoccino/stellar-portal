import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

const AccountId = ({ accountId }) => {
  return (
    <div>
      <span style={styles.account_id}>
        {AccountId.getAccountIdText(accountId)}
      </span>
      <Button
        className="balances-address-copy"
        circular
        basic
        compact
        icon="clipboard"
        data-clipboard-text={accountId}
      />
    </div>
  );
};

AccountId.getAccountIdText = issuer => {
  const size = 4;
  const firstThree = issuer.slice(0, size);
  const lastThree = issuer.slice(-size);
  return `${firstThree}...${lastThree}`;
};

const styles = {
  account_id: {
    padding: '0 0.5rem',
  },
};

AccountId.propTypes = {
  accountId: PropTypes.string,
};

export default AccountId;
