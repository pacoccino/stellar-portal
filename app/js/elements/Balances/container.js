import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from './component';
import { canSign, getBalances, isCreatingTrustline } from '../../helpers/selector';
import { createTrustline, deleteTrustline } from '../../actions-creators/stellar';

const mapStateToProps = (state) => ({
  balances: getBalances(state),
  canSign: canSign(state),
  creatingTrustline: isCreatingTrustline(state),
});

const mapDispatchToProps = {
  createTrustline,
  deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
