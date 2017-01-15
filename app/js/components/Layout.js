import React, { PropTypes } from 'react';
import { Container, Menu, Button, Icon } from 'semantic-ui-react'

import TopBar from '../elements/UiTools/TopBar';
import ErrorModal from '../elements/UiTools/ErrorModal';

const light = {
  color: '#bababa',
};
const Layout = ({ children }) =>
  <div className="layout-container">
    <TopBar />
    {children}
    <Menu fixed="bottom" inverted>
      <Container>
        <Menu.Item>
          <span style={light}>
          Made with &nbsp; <Icon name="heart" /> by &nbsp;<a href="https://ngfar.io" target="_blank">ngfar</a>
          </span>
        </Menu.Item>
        <Menu.Item>
          <span style={light}>
          <a href="https://stellar.org" target="_blank">stellar.org</a>
          </span>
        </Menu.Item>
        <Menu.Item position="right">
          <span style={light}>
           Hey, it's Open Source :&nbsp;
          </span>
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

export default Layout;
