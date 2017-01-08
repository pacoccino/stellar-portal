import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Balances from './component';
import { getBalances } from '../../helpers/selector';

const mapStateToProps = (state) => ({ balances: getBalances(state) });

export default connect(mapStateToProps, null)(Balances);
