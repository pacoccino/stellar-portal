import React, { PropTypes } from 'react';
import { Container, Menu, Button, Icon } from 'semantic-ui-react'

const Layout = ({ children }) =>
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          Stellar Portal
        </Menu.Item>
      </Container>
    </Menu>
    <Container text className="main">
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
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
