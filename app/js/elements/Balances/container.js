import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from './component';
import { canSign, getBalances, getTrustlines } from '../../helpers/selector';
import { createTrustline, deleteTrustline } from '../../actions-creators/stellar';

const mapStateToProps = (state) => ({
  balances: getBalances(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
});

const mapDispatchToProps = {
  createTrustline,
  deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
