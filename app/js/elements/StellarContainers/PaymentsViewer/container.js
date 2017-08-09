import { connect } from 'react-redux';
import Component from './component';

import { getAccount } from '../../../selectors/account';
import { getPaymentsFromPayments, getPathPaymentsFromPayments } from '../../../selectors/stellarData';
import { getNetwork } from '../../../selectors/stellarData';

const mapStateToProps = state => ({
  payments: getPaymentsFromPayments(state),
  pathPayments: getPathPaymentsFromPayments(state),
  account: getAccount(state),
  network: getNetwork(state),
});

export default connect(mapStateToProps, null)(Component);
