import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { getAccount, setSeed } from '../../actions/account';

import AccountSelector from '../../components/stellar/AccountSelector';

const mapStateToProps = ({ account }) => ({ account });
const mapDispatchToProps = { getAccount, setSeed };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);
