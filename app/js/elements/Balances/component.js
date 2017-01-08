import React, { PropTypes } from 'react';
import { Header, Table } from 'semantic-ui-react'
import Asset from '../../components/stellar/Asset';

const getBalanceRow = (balance, index) => {
  return (
    <Table.Row key={index}>
      <Table.Cell>
        <Asset {...balance} />
      </Table.Cell>
      <Table.Cell>
        {balance.balance}
      </Table.Cell>
    </Table.Row>
  );
};

const Balances = ({ balances }) =>
  <div>
    <Header as="h2">Balances</Header>
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset</Table.HeaderCell>
          <Table.HeaderCell>Balance</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {balances.map(getBalanceRow)}
      </Table.Body>
    </Table>
  </div>;

Balances.propTypes = {
  balances: PropTypes.array.isRequired,
};

export default Balances;
