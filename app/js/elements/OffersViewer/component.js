import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'
import Asset from '../../components/stellar/Asset';

const getOffers = (payment, index) => {
  return (
    <List.Item key={index}>
      <div>
        <Header as="h3">Selling:</Header>
        <Asset {...payment.selling} />
      </div>
      <div>
        <Header as="h3">Buying:</Header>
        <Asset {...payment.buying} />
      </div>
      <p>
        <b>Price: </b> {payment.price}
      </p>
      <p>
        <b>Amount: </b> {payment.amount}
      </p>
    </List.Item>
  );
};

const Offers = ({ offers }) =>
  <div>
    <Header as="h2">Offers</Header>
    {offers ?
      <List>
        {offers.map(getOffers)}
      </List>
      : null
    }
  </div>;

Offers.propTypes = {
  offers: PropTypes.array,
};

export default Offers;
