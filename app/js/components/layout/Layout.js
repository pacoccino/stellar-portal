import React, { PropTypes } from 'react';
import { Container, Menu, Button, Icon } from 'semantic-ui-react'

import NetworkSwitcher from '../../elements/UiTools/NetworkSwitcher';
import ErrorModal from '../../elements/UiTools/ErrorModal';

const Layout = ({ children }) =>
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header onClick={() => { location = '/'; }}>
          Stellar Portal
        </Menu.Item>
        <Menu.Item position="right">
          <NetworkSwitcher />
        </Menu.Item>
      </Container>
    </Menu>
    <Container fluid className="main" style={styles.container}>
      {children}
    </Container>
    <Menu attached="bottom" inverted>
      <Container>
        <Menu.Item>
          Made with &nbsp; <Icon name="heart" /> by &nbsp;<a href="https://ngfar.io" target="_blank">ngfar</a>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            icon="github"
            compact
            onClick={() => window.open("https://github.com/pakokrew/stellar-portal")}
          />
        </Menu.Item>
      </Container>
    </Menu>
    <ErrorModal />
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  container: {
    padding: '5rem'
  }
}
export default Layout;
