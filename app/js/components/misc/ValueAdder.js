import React, { Component, PropTypes } from 'react';

class ValueAdder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    e.preventDefault();
    const value = e.target.value || '';
    this.setState({
      value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.addElement(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={::this.handleChange} />
        <button onClick={::this.handleSubmit}>Add</button>
      </div>
    );
  }
}

ValueAdder.propTypes = {
  addElement: PropTypes.func.isRequired,
};

export default ValueAdder;
