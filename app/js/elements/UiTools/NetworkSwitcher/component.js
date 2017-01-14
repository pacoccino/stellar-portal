import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react'

class NetworkSwitcher extends React.Component {
  render() {
    const { switchNetwork, network } = this.props;

    return (
      <Dropdown
        labeled compact
        className="icon"
        button floating
        icon="cubes"
        text={network === 'public' ? 'Public' : 'TestNet'}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            text="Public"
            onClick={() => switchNetwork('public')}
          />
          <Dropdown.Item
            text="TestNet"
            onClick={() => switchNetwork('test')}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NetworkSwitcher.propTypes = {
  network: PropTypes.string.isRequired,
  switchNetwork: PropTypes.func.isRequired,
};

export default NetworkSwitcher;
