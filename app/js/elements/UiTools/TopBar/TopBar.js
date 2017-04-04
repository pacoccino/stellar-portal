import React, { PropTypes } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';

import NetworkSwitcher from '../../../elements/UiTools/NetworkSwitcher';
// import AccountSwitcher from '../../../elements/UiTools/AccountSwitcher';
import ChangeAccount from '../../../elements/UiTools/ChangeAccount';
import KeypairGenerator from '../../../elements/UiTools/KeypairGenerator';

import icon from '../../../../../content/assets/images/favicon-32x32.png';

const TopBar = ({ goHome, keypairModalOpen, openKeypairModal, closeKeypairModal, currentAccount }) =>
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
      {/*<Menu.Item>
       <AccountSwitcher />
       </Menu.Item>*/}
      { currentAccount &&
      <Menu.Item>
        <ChangeAccount />
      </Menu.Item>
      }
      <Menu.Item>
        <NetworkSwitcher />
      </Menu.Item>
    </Container>
  </Menu>;

TopBar.propTypes = {
  goHome: PropTypes.func.isRequired,
  openKeypairModal: PropTypes.func.isRequired,
  closeKeypairModal: PropTypes.func.isRequired,
  keypairModalOpen: PropTypes.bool,
  currentAccount: PropTypes.object,
};

export default TopBar;
