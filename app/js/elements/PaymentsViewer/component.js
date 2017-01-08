import React, { PropTypes } from 'react';
import { Header, List, Table } from 'semantic-ui-react'

import Asset from '../../components/stellar/Asset';
import AccountId from '../../components/stellar/AccountId';

const getPaymentRow = (payment, index) => {
  return (
    <Table.Row key={index}>
      <Table.Cell>
        <AccountId accountId={payment.to} />
      </Table.Cell>
      <Table.Cell>
        {payment.amount}
      </Table.Cell>
      <Table.Cell>
        <Asset {...payment} />
      </Table.Cell>
    </Table.Row>
  );
};


const getPathPaymentRow = (payment, index) => {
  return (
    <Table.Row key={index}>
      <Table.Cell>
        <AccountId accountId={payment.to} />
      </Table.Cell>
      <Table.Cell>
        {payment.amount}
      </Table.Cell>
      <Table.Cell>
        <Asset
          asset_type={payment.source_asset_type}
          asset_issuer={payment.source_asset_issuer}
          asset_code={payment.source_asset_code} />
      </Table.Cell>
      <Table.Cell>
        <Asset {...payment} />
      </Table.Cell>
    </Table.Row>
  );
};

const Payments = ({ payments }) =>
  <div>
    <Header as="h3">Payments</Header>
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>To account</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Asset</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {payments.filter(p => (p.type === 'payment')).map(getPaymentRow)}
      </Table.Body>
    </Table>

    <Header as="h3">Path payments</Header>
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>To account</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>From asset</Table.HeaderCell>
          <Table.HeaderCell>To asset</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {payments.filter(p => (p.type === 'path_payment')).map(getPathPaymentRow)}
      </Table.Body>
    </Table>
  </div>;

Payments.propTypes = {
  payments: PropTypes.array,
};

export default Payments;
