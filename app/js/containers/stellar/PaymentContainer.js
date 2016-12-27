import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Payment from '../../components/stellar/Payment';
import { sendPayment } from '../../actions/account';

const mapStateToProps = ({ account }) => ({ account: account.data });
const mapDispatchToProps = { sendPayment };

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
