import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from '../../components/stellar/Balances';

const BalancesContainer = (props) => (
  props.balances ?
    <Balances {...props}/>
    :
    null
);
const mapStateToProps = ({ account }) => ({ balances: account.balances });

export default connect(mapStateToProps, null)(BalancesContainer);
