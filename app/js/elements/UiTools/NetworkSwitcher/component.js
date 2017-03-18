import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

class NetworkSwitcher extends React.Component {
  render() {
    const { switchNetwork, network } = this.props;

    let text = null;
    switch (network) {
      case 'public':
        text = 'Public';
        break;
      case 'test':
        text = 'TestNet';
        break;
      case 'perso':
        text = 'Perso';
        break;
      default:
    }
    return (
      <Dropdown
        labeled compact
        className="icon"
        button floating
        size="mini"
        icon="cubes"
        text={text}
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
          {/*          <Dropdown.Item
            text="Perso"
            onClick={() => switchNetwork('perso')}
          />*/}
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
