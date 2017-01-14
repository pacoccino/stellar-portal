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
        <Modal.Header style={{color: 'red'}}>Operation error</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Message negative>
              <Message.Header>There was an error with your transaction.</Message.Header>
              <p>{error.title}</p>
            </Message>
            Error codes:
            <List bulleted>
              {
                !!error.extras.result_codes.operations ?
                  error.extras.result_codes.operations.map((o, i) => <List.Item key={i}>{o}</List.Item>)
                  : null
              }
            </List>
            JSON error:
            <pre>{JSON.stringify(error, null, 2)}</pre>
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
