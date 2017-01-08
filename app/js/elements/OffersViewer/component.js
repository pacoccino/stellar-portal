import React, { PropTypes } from 'react';
import { Form, Button, Header, List } from 'semantic-ui-react'
import Asset from '../../components/stellar/Asset';

class Offers extends React.Component {
  createOffer(e, { formData }) {
    e.preventDefault();

    const selling = this.props.trustlines[formData.buy_asset].asset;
    const buying = this.props.trustlines[formData.sell_asset].asset;

    const offerData = {
      selling,
      buying,
      amount: formData.amount,
      price: formData.price,
    };

    this.props.createOffer(offerData);
  }

  getOffer(offer, index) {
    return (
      <List.Item key={index}>
        <div>
          <Header as="h3">Selling:</Header>
          <Asset {...offer.selling} />
        </div>
        <div>
          <Header as="h3">Buying:</Header>
          <Asset {...offer.buying} />
        </div>
        <p>
          <b>Price: </b> {offer.price}
        </p>
        <p>
          <b>Amount: </b> {offer.amount}
        </p>
      </List.Item>
    );
  }

  render() {
    const { offers } = this.props;
    return (
      <div>
        <Header as="h2">Offers</Header>
        {offers ?
          <List>
            {offers.map(::this.getOffer)}
          </List>
          : null
        }
        <Header as="h3">Create offer</Header>
        <Form onSubmit={::this.createOffer}>
          <Form.Field
            label='Buy' control='select'
            name="buy_asset"
          >
            {this.props.trustlines.map((t, index) => (
              <option key={index} value={index}>{t.label}</option>
            ))}
          </Form.Field>
          <Form.Field
            label='Sell' control='select'
            name="sell_asset"
          >
            {this.props.trustlines.map((t, index) => (
              <option key={index} value={index}>{t.label}</option>
            ))}
          </Form.Field>
          <Form.Field
            name="amount"
            label='Amount'
            control='input'
            type='number'
            placeholder='0'
            required
          />
          <Form.Field
            name="price"
            label='Price'
            control='input'
            type='number'
            placeholder='1'
            required
          />
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    );
  }
}

Offers.propTypes = {
  trustlines: PropTypes.array,
  offers: PropTypes.array,
  createOffer: PropTypes.func.isRequired,
};

export default Offers;
