import React from 'react';

const TransactionItem = ({ transaction }) => {
  const amount = Object.values(transaction.outputMap).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return (
    <li>
      <p>{transaction.id}</p>
      <p>
        {transaction.input.timestamp
          ? new Date(transaction.input.timestamp).toLocaleString()
          : ''}
      </p>
      <p>{amount}</p>
    </li>
  );
};

export default TransactionItem;
