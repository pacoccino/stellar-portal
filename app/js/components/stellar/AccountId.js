import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import Clipboard from 'clipboard';

class AccountId extends React.Component {
  componentDidMount() {
    new Clipboard(".accountId-copy")
  }

  render() {
    const { accountId, myAccountId } = this.props;
    return (
      <div>
        <span style={styles.account_id}>
          {AccountId.getAccountIdText(accountId, myAccountId)}
        </span>
        <Button
          className="accountId-copy"
          circular
          basic
          compact
          icon="clipboard"
          data-clipboard-text={accountId}
        />
      </div>
    );
  }
}

AccountId.getAccountIdText = (issuer, myAccountId) => {
  if(myAccountId && issuer === myAccountId) {
    return "Me";
  }
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
  myAccountId: PropTypes.string,
};

export default AccountId;
