import React, { PropTypes } from 'react';
import { Button, Container, Message, Modal } from 'semantic-ui-react';

import AccountKeyViewer from '../../StellarContainers/CurrentAccount';
import { Keypair } from 'stellar-sdk';

class KeypairGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keypair: null,
    }
  }

  generateKeypair() {
    this.setState({ keypair: Keypair.random() });
  }

  render() {
    return (
      <Modal open={this.props.open}>
        <Modal.Header>Keypair generator</Modal.Header>
        <Modal.Content>
          <Container>
            <Message info size="big">
              <Message.Header>Click on <i>generate</i> to get a new keypair.</Message.Header>
              <p>Keep it safe !</p>
            </Message>
          </Container>
        </Modal.Content>
        <Modal.Content>
          {!!this.state.keypair && <AccountKeyViewer keypair={this.state.keypair} showSeed />}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={::this.generateKeypair} primary>Generate</Button>
          <Button onClick={() => this.props.close()} secondary>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

KeypairGenerator.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

export default KeypairGenerator;
