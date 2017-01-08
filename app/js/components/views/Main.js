import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../elements/AccountSelector';
import AccountViewerContainer from '../../elements/AccountViewer';

const Main = (props) => (
  <div>
    <AccountSelectorContainer {...props} />
    <Divider />
    <AccountViewerContainer />
  </div>
);

Main.propTypes = {
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};

export default Main;