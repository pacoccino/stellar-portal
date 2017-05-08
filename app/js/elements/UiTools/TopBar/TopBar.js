import React, { PropTypes } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import icon from '../../../../../content/assets/images/favicon-32x32.png';
import * as routes from '../../../constants/routes';

const Layout = ({ keypair, goHome, keypairModalOpen, openKeypairModal, closeKeypairModal, resetAccount }) =>
  <Menu fixed="top" inverted>
    {
      keypair ?
        <Container>
          <Menu.Item>
            <Link to={routes.Root}>
              <img src={icon} alt="menu icon" />
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.Balances}>
              Balances
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.Offers}>
              Offers
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.Consume}>
              Consume
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.CreateAsset}>
              Register new asset
            </Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Button
              content="Disconnect"
              onClick={resetAccount}
            />
          </Menu.Item>
        </Container>

        :

        <Container>
          <Menu.Item>
            <Link to={routes.Root}>
              <img src={icon} alt="menu icon" />
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.Login}>
              Login
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link to={routes.Register}>
              Register
            </Link>
          </Menu.Item>
        </Container>
    }

  </Menu>;

Layout.propTypes = {
  goHome: PropTypes.func.isRequired,
  openKeypairModal: PropTypes.func.isRequired,
  resetAccount: PropTypes.func.isRequired,
  closeKeypairModal: PropTypes.func.isRequired,
  keypair: PropTypes.object,
  keypairModalOpen: PropTypes.bool,
};

export default Layout;
