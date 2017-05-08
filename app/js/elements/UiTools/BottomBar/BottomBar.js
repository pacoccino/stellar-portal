import React, { PropTypes } from 'react';
import { Container, Icon, Menu, Button } from 'semantic-ui-react';

const light = {
  color: '#bababa',
};

const Layout = ({ goDesktop }) =>
  <Menu fixed="bottom" inverted>
    <Container>
      <Menu.Item>
        <span style={light}>
          Made with &nbsp; <Icon name="heart" color="red" />
          for LuxBlock Hackathon
        </span>
      </Menu.Item>
      <Menu.Item>
        <span style={light}>
          <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">
            stellar.org
          </a>
        </span>
      </Menu.Item>
      <Menu.Item position="right">
        <span style={light}>
           Hey, it&#39;s Open Source :&nbsp;
          </span>
        <Button
          icon="github"
          compact
          onClick={() => window.open('https://github.com/pakokrew/stellar-portal')}
        />
      </Menu.Item>
    </Container>
  </Menu>;

Layout.propTypes = {
  goDesktop: PropTypes.func.isRequired,
};

export default Layout;
