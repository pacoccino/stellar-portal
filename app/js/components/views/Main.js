import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../elements/AccountSelector';
import AccountViewerContainer from '../../elements/AccountViewer';

const Main = () => (
  <div>
        <AccountSelectorContainer />
        <Divider />
        <AccountViewerContainer />
  </div>
);

export default Main;