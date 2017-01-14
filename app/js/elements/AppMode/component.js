import React, { Component, PropTypes } from 'react';

import Welcome from '../../components/views/WelcomeView';
import PrivateView from '../../components/views/PrivateView';
import PublicView from '../../components/views/PublicView';

function AppMode({ accountSet, canSign }) {
  return accountSet ? (canSign ? <PrivateView /> : <PublicView />) : <Welcome />;
}
AppMode.propTypes = {
  accountSet: PropTypes.bool,
  canSign: PropTypes.bool,
};

export default AppMode;
