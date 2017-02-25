import React, { PropTypes } from 'react';
import Decimal from 'decimal.js';

const AmountComponent = ({ amount, accountId, payment }) => {
  const amountStyle = {};
  if (accountId && payment && accountId === payment.from) {
    amountStyle.color = 'red';
  } else if (accountId) {
    amountStyle.color = 'green';
  }
  const bnAmount = new Decimal(amount || (payment && payment.amount));

  return (
    <span style={amountStyle}>{bnAmount.toString()}</span>
  );
};

AmountComponent.propTypes = {
  amount: PropTypes.string,
  accountId: PropTypes.string,
  payment: PropTypes.object,
};

export default AmountComponent;
