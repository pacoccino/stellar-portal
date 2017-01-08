import { connect } from 'react-redux';
import Component from './component'

import { createTrustline, deleteTrustline } from '../../actions-creators/stellar';
import { getTrustlines } from '../../selectors/selector';

const mapStateToProps = (state) => ({
  trustlines: getTrustlines(state),
});

const mapDispatchToProps = {
    createTrustline,
    deleteTrustline,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
