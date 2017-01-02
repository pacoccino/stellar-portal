import { connect } from 'react-redux';
import Component from './component'

const mapStateToProps = ({ stellar }) => ({ transactions: []/*stellar.transactions*/ });

export default connect(mapStateToProps, null)(Component);
