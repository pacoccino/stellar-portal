import { connect } from 'react-redux';
import Component from './component'

import { createTrustline, deleteTrustline } from '../../actions-creators/stellar';
import { getTrustlines } from '../../helpers/selector';
import { canSign } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  trustlines: getTrustlines(state),
  canSign: canSign(state),
});

const mapDispatchToProps = {
    createTrustline,
    deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
