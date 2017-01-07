import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'

import Asset from '../../components/stellar/Asset';

const getPathPayment = (payment) => (
  <div>
    Path payment
    <div>
      <Header as="h3">From</Header>
      <Asset
      asset_type={payment.source_asset_type}
      asset_issuer={payment.source_asset_issuer}
      asset_code={payment.source_asset_code} />
    </div>
    <div>
      <Header as="h3">To</Header>
      <Asset {...payment} />
    </div>
    <div>
      <Header as="h3">Amount</Header>
       {payment.amount}
       </div>
  </div>
);

const getPayments = (payment, index) => {
  let content = null;
  if(payment.type === 'path_payment') {
    content = getPathPayment(payment);
  }
  if(!content) return null;
  return (
    <List.Item key={index}>
      {content}
    </List.Item>
  );
};

const Payments = ({ payments }) =>
  <div>
    <Header as="h2">Payments</Header>
    {payments ?
      <List>
        {payments.map(getPayments)}
      </List>
      : null
    }
  </div>;

Payments.propTypes = {
  payments: PropTypes.array,
};

export default Payments;
