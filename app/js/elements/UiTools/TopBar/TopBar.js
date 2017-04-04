import React, { PropTypes } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';

import NetworkSwitcher from '../../../elements/UiTools/NetworkSwitcher';
import AccountSwitcher from '../../../elements/UiTools/AccountSwitcher';
import KeypairGenerator from '../../../elements/UiTools/KeypairGenerator';

import icon from '../../../../../content/assets/images/favicon-32x32.png';

function duplicateTab() {
  window.open(window.location.href);
}

const Layout = ({ keypair, goHome, keypairModalOpen, openKeypairModal, closeKeypairModal }) =>
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item>
        <img src={icon} alt="menu icon" />
      </Menu.Item>
      <Menu.Item header onClick={goHome}>
        Stellar Portal
      </Menu.Item>
      <Menu.Item position="right">
        <Button
          content="Keypair generator"
          onClick={openKeypairModal}
        />
        <KeypairGenerator open={keypairModalOpen} close={closeKeypairModal} />
      </Menu.Item>
      {keypair &&
      <Menu.Item>
        <AccountSwitcher />
      </Menu.Item>
      }
      <Menu.Item>
        <NetworkSwitcher />
      </Menu.Item>
      <Menu.Item>
        <Button
          icon="external"
          onClick={duplicateTab}
        />
      </Menu.Item>
    </Container>
  </Menu>;

Layout.propTypes = {
  goHome: PropTypes.func.isRequired,
  openKeypairModal: PropTypes.func.isRequired,
  closeKeypairModal: PropTypes.func.isRequired,
  keypair: PropTypes.object,
  keypairModalOpen: PropTypes.bool,
};

export default Layout;
