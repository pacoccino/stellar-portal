import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import AccountViewer from '../../components/stellar/AccountViewer';

const mapStateToProps = ({ account }) => ({ account: account.data });

export default connect(mapStateToProps, null)(AccountViewer);
