import React, { PropTypes } from 'react';

import TopBar from '../elements/UiTools/TopBar';
import BottomBar from '../elements/UiTools/BottomBar';
import ErrorModal from '../elements/UiTools/ErrorModal';

const Layout = ({ children }) =>
  <div className="layout-container">
    <TopBar />
    {children}
    <BottomBar />
    <ErrorModal />
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
