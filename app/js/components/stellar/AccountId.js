import React, { PropTypes } from 'react';

const AccountId = ({ accountId }) => {
  return (
    <span style={styles.account_id}>{AccountId.getAccountIdText(accountId)}</span>
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
  },
};

AccountId.propTypes = {
  accountId: PropTypes.string,
};

export default AccountId;
