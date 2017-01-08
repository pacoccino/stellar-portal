import React, { PropTypes } from 'react';

const AmountComponent = ({ accountId, payment }) => {
  const amountStyle = {};
  if(accountId && accountId === payment.from) {
    amountStyle.color = 'red';
  } else if(accountId) {
    amountStyle.color = 'green';
  }
  const amount = payment.amount;
  return (
    <span style={amountStyle}>{amount}</span>
  );
};

AmountComponent.propTypes = {
  accountId: PropTypes.string,
  payment: PropTypes.object.isRequired,
};

export default AmountComponent;