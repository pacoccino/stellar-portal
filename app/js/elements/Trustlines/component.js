import React, { PropTypes } from 'react';
import { Button, Header, Form, List } from 'semantic-ui-react'
import { Asset } from 'stellar-sdk';

class Trustlines extends React.Component {

  addTrustline(e, { formData }) {
    e.preventDefault();
    const asset = new Asset(formData.asset_code, formData.asset_issuer);
    this.props.changeTrust({ asset });
  }

  getTrustline(trustline, index) {
    const { asset } = trustline;
    if(asset.isNative()) return null;

    return (
      <List.Item key={index}>
        {asset.getCode()} {asset.getIssuer()}
        <Button onClick={() => this.props.deleteTrustline(asset)}>Remove</Button>
      </List.Item>
    );
  }

  render() {
    const { trustlines } = this.props;
    return (
      <div>
        <Header as="h2">Trustlines</Header>
        {trustlines ?
          <List>
            {trustlines.map(::this.getTrustline)}
          </List>
          : null
        }
        <Header as="h3">Add</Header>
        <Form onSubmit={::this.addTrustline}>
          {/*          <Form.Field
           label='Code type' control='select'
           name="code_type"
           >
           <option value="credit_alphanum4">Alphanumeric 4</option>
           <option value="credit_alphanum12">Alphanumeric 12</option>
           </Form.Field>*/}
          <Form.Field
            name="asset_code"
            label='Code'
            control='input'
            type='text'
            placeholder='Asset code'
            required
          />
          <Form.Field
            name="asset_issuer"
            label='Issuer'
            control='input'
            type='text'
            placeholder='Issuer account id'
            required
          />
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    );
  }
}

Trustlines.propTypes = {
  trustlines: PropTypes.array,
  changeTrust: PropTypes.func.isRequired,
};

export default Trustlines;
