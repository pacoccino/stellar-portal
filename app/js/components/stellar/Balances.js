import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'
import Asset from './Asset';

const getAssetType = (type) => {
  switch(type) {
    case 'native':
      return "XLM";
    case 'credit_alphanum4':
      return 'Alphanum 4';
    case 'credit_alphanum12':
      return 'Alphanum 12';
  }
};

const getBalance = (balance, index) => {
  return (
    <List.Item key={index}>
      <Asset {...balance} />
    </List.Item>
  );
};

const Balances = ({ balances }) =>
  <div>
    <Header as="h2">Balances</Header>
    <List>
      {balances.map(getBalance)}
    </List>
  </div>;

Balances.propTypes = {
  balances: PropTypes.array.isRequired,
};

export default Balances;
