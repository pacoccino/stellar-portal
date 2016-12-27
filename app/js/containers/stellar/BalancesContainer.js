import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from '../../components/stellar/Balances';

const BalancesContainer = ({ account }) => (
  account ?
    <Balances balances={account.balances} />
    :
    null
);
const mapStateToProps = ({ account }) => ({ account: account.data });

export default connect(mapStateToProps, null)(BalancesContainer);
