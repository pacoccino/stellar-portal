import { connect } from 'react-redux';
import Component from './component';

import { getAccount } from '../../../selectors/account';
import { getPaymentsFromPayments, getPathPaymentsFromPayments } from '../../../selectors/stellarData';

const users =[
  {
    account_id: 'GCF3UDJ3W5AVVDKA2FDX3XNSSW3XRGSP6N3DDSRDILWQFU222GGFYUPL',
    stellar_address: 'markus',
  }
]
const mapStateToProps = state => ({
  payments: getPaymentsFromPayments(state),
  pathPayments: getPathPaymentsFromPayments(state),
  account: getAccount(state),
  users,
});

export default connect(mapStateToProps, null)(Component);
