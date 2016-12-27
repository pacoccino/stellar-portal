import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../containers/stellar/AccountSelectorContainer';
import AccountViewerContainer from '../../containers/stellar/AccountViewerContainer';
import AccountActionsContainer from '../../containers/stellar/AccountActionsContainer';

const Main = () => (
  <div>
    <AccountSelectorContainer />
    <Divider />
    <AccountViewerContainer />
    <Divider />
    <AccountActionsContainer />
  </div>
);

export default Main;