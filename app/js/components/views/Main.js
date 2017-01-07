import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../containers/stellar/AccountSelectorContainer';
import AccountViewerContainer from '../../containers/stellar/AccountViewerContainer';
import AccountActionsContainer from '../../containers/stellar/AccountActionsContainer';
import PaymentsViewer from '../../elements/PaymentsViewer';

const Main = () => (
  <div>
      <AccountSelectorContainer />
      <Divider />
      <AccountViewerContainer />
      <Divider />
      <AccountActionsContainer />
      <Divider />
      <PaymentsViewer />
  </div>
);

export default Main;