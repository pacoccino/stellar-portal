import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setAccountId } from '../../actions/account';

import AccountSelector from '../../components/stellar/AccountSelector';

const mapStateToProps = ({ account }) => ({ account });
const mapDispatchToProps = { setAccountId };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);
