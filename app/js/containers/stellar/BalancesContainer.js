import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from '../../components/stellar/Balances';
import { getBalances } from '../../selectors/selector';

const mapStateToProps = (state) => ({ balances: getBalances(state) });

export default connect(mapStateToProps, null)(Balances);
