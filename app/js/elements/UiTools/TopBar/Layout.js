import React, { PropTypes } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react'

import NetworkSwitcher from '../../../elements/UiTools/NetworkSwitcher';
import AccountSwitcher from '../../../elements/UiTools/AccountSwitcher';
import KeypairGenerator from '../../../elements/UiTools/KeypairGenerator';

const Layout = ({ goHome, keypairModalOpen, openKeypairModal, closeKeypairModal }) =>
    <Menu fixed="top" inverted>
      <Container>
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
        <Menu.Item>
          <AccountSwitcher />
        </Menu.Item>
        <Menu.Item>
          <NetworkSwitcher />
        </Menu.Item>
      </Container>
    </Menu>;

Layout.propTypes = {
  goHome: PropTypes.func.isRequired,
  openKeypairModal: PropTypes.func.isRequired,
  closeKeypairModal: PropTypes.func.isRequired,
  keypairModalOpen: PropTypes.bool,
};

export default Layout;
