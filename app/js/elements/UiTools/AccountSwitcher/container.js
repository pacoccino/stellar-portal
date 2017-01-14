import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { resetAccount } from '../../../actions-creators/account';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  resetAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitcher);
