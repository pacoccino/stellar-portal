import { connect } from 'react-redux';
import Component from './component'

import { getPayments } from '../../selectors/selector';

const mapStateToProps = (state) => ({ payments: getPayments(state) });

export default connect(mapStateToProps, null)(Component);
