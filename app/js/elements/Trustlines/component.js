import React, { PropTypes } from 'react';
import { Button, Header, Form, Table } from 'semantic-ui-react'
import Stellar from 'stellar-sdk';

import Asset from '../../components/stellar/Asset';

class Trustlines extends React.Component {

  addTrustline(e, { formData }) {
    e.preventDefault();
    const asset = new Stellar.Asset(formData.asset_code, formData.asset_issuer);
    this.props.createTrustline(asset);
  }

  getTrustline(asset, index) {
    if(asset.isNative()) return null;

    return (
      <Table.Row key={index}>
        <Table.Cell>
          <Asset asset={asset} />
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={() => this.props.deleteTrustline(asset)}
            basic color='red'
            floated="right"
          >
            Remove
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }

  getTrustlines() {
    return (
      <Table>
        <Table.Body>
          {this.props.trustlines.map(::this.getTrustline)}
        </Table.Body>
      </Table>
    );
  }

  getTrustlineForm() {
    if(!this.props.canSign) {
      return null;
    }
    return (
      <div>
        <Header as="h3">Add trustline</Header>
        <Form onSubmit={::this.addTrustline}>
          <Form.Group>
            <Form.Field
              name="asset_code"
              label='Code'
              control='input'
              type='text'
              placeholder='Asset code'
              width="3"
              required
            />
            <Form.Field
              name="asset_issuer"
              label='Issuer'
              control='input'
              type='text'
              placeholder='Issuer account id'
              width="10"
              required
            />
            <Button type='submit'>Add</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Header as="h2">Trustlines</Header>
        {this.getTrustlines()}
        {this.getTrustlineForm()}
      </div>
    );
  }
}

Trustlines.propTypes = {
  trustlines: PropTypes.array,
  createTrustline: PropTypes.func.isRequired,
  deleteTrustline: PropTypes.func.isRequired,
  canSign: PropTypes.bool,
};

export default Trustlines;
