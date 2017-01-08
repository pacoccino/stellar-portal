import React from 'react';
import { Divider } from 'semantic-ui-react'

import AccountSelectorContainer from '../../elements/AccountSelector';
import AccountViewerContainer from '../../elements/AccountViewer';
import ErrorModal from '../../elements/ErrorModal';

const Main = (props) => (
  <div>
    <AccountSelectorContainer {...props} />
    <Divider />
    <AccountViewerContainer />
    <ErrorModal />
  </div>
);

Main.propTypes = {
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};

export default Main;