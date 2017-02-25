import React from 'react';
import { Button, List, Message, Modal } from 'semantic-ui-react';
import { get } from 'lodash';

class ErrorModal extends React.Component {
  render() {
    const error = this.props.errorData;

    if (!error) {
      return null;
    }

    const resultCodes = get(error, 'extras.result_codes.operations', null);

    return (
      <Modal open={this.props.open}>
        <Modal.Header style={{ color: 'red' }}>Operation error</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Message negative>
              <Message.Header>There was an error with your transaction.</Message.Header>
              <p>{error.title}</p>
              {error.message && <p>{error.message}</p>}
            </Message>
            {!!resultCodes &&
              <div>
                Error codes :
                <List bulleted>
                  {
                    resultCodes ?
                      resultCodes.map((o, i) => <List.Item key={i}>{o}</List.Item>)
                      : null
                  }
                </List>
              </div>
            }
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
