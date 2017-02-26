import React, { PropTypes } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import Clipboard from 'clipboard';

class AccountId extends React.Component {
  componentDidMount() {
    new Clipboard('.accountId-copy'); // eslint-disable-line no-new
  }

  render() {
    const { accountId, myAccountId } = this.props;
    return (
      <Popup
        hoverable
        trigger={
          <span>
            {AccountId.getAccountIdText(accountId, myAccountId)}
          </span>
        }
      >
        <Popup.Header>
          <p>{accountId}</p>
        </Popup.Header>
        <Popup.Content>
          <Button
            className="accountId-copy"
            circular
            basic
            color="blue"
            compact
            icon="clipboard"
            content="Copy account address"
            data-clipboard-text={accountId}
          />
        </Popup.Content>
      </Popup>
    );
  }
}

AccountId.getAccountIdText = (issuer, myAccountId) => {
  if (myAccountId && issuer === myAccountId) {
    return 'Me';
  }
  const size = 4;
  const firstThree = issuer.slice(0, size);
  const lastThree = issuer.slice(-size);
  return `${firstThree}...${lastThree}`;
};

AccountId.propTypes = {
  accountId: PropTypes.string,
  myAccountId: PropTypes.string,
};

export default AccountId;
