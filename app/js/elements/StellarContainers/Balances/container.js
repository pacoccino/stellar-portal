import { connect } from 'react-redux';

import Balances from './component';
import { canSign, getBalances } from '../../../selectors/account';
import { isCreatingTrustline } from '../../../selectors/ui';
import { createTrustline, deleteTrustline } from '../../../actions-creators/stellar';

const mapStateToProps = state => ({
  balances: getBalances(state),
  canSign: canSign(state),
  creatingTrustline: isCreatingTrustline(state),
});

const mapDispatchToProps = {
  createTrustline,
  deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
