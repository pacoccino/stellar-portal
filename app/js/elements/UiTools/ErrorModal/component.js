import React from 'react';
import { Button, List, Message, Modal, TextArea } from 'semantic-ui-react';

class ErrorModal extends React.Component {
  render() {
    const error = this.props.errorData;

    if(!error) {
      return null;
    }
    return (
      <Modal open={this.props.open}>
        <Modal.Header style={{color: 'red'}}>{error.title}</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Message negative>
              <Message.Header>{error.detail}</Message.Header>
              <p>Result codes: {error.extras.result_codes.transaction}</p>
            </Message>
            Error codes:
            <List bulleted>
              {
                !!error.extras.result_codes.operations ?
                  error.extras.result_codes.operations.map((o, i) => <List.Item key={i}>{o}</List.Item>)
                  : null
              }
            </List>
            Envelope :
            <TextArea value={error.extras.envelope_xdr} />
            <br/>
            Result :
            <TextArea value={error.extras.result_xdr} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.props.closeErrorModal()} primary>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ErrorModal.propTypes = {
  open: React.PropTypes.bool,
  errorData: React.PropTypes.object,
  closeErrorModal: React.PropTypes.func.isRequired,
};

export default ErrorModal;
