import { connect } from 'react-redux';
import Component from './component'

import { getOffers } from '../../selectors/selector';

const mapStateToProps = (state) => ({ offers: getOffers(state) });

export default connect(mapStateToProps, null)(Component);
