import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import AccountActions from '../../components/stellar/AccountActions';

const mapStateToProps = ({ account }) => ({ account: account.data });

export default connect(mapStateToProps, null)(AccountActions);
