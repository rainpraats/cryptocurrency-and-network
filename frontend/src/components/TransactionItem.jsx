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
      <div>
        <details>
          <summary>
            <p>From</p>
          </summary>
          <p>{transaction.input.address}</p>
          <p>{transaction.input.amount}</p>
        </details>
        <details>
          <summary>
            <p>To</p>
          </summary>
          <ul>
            {Object.entries(transaction.outputMap).map(([address, amount]) => (
              <li key={`${transaction.id}-${address}`}>
                <p>{address}</p>
                <p>{amount}</p>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </li>
  );
};

export default TransactionItem;
