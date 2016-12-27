import React, { PropTypes } from 'react';
import { Container } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react'

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
  </div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
