import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../containers/stellar/AccountSelectorContainer';
import AccountViewerContainer from '../../containers/stellar/AccountViewerContainer';

const Main = () => (
  <div>
        <AccountSelectorContainer />
        <Divider />
        <AccountViewerContainer />
  </div>
);

export default Main;