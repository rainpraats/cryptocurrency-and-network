import './TransactionItem.css';

const TransactionItem = ({ transaction, usersAddress }) => {
  const amount = Object.values(transaction.outputMap).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return (
    <li className="transaction-item">
      <div className="hash-and-date">
        <p>{`...${transaction.id.slice(-10)}`}</p>
        <p>
          {transaction.input.timestamp
            ? new Date(transaction.input.timestamp).toLocaleString()
            : ''}
        </p>
      </div>
      <div>
        <p>To</p>
        <ul>
          {Object.entries(transaction.outputMap).map(([address, amount]) => {
            if (address !== usersAddress) {
              return (
                <li
                  className="reciever-and-amount"
                  key={`${transaction.id}-${address}`}
                >
                  <p>
                    Address:{' '}
                    {address.length > 10 ? `...${address.slice(-10)}` : address}
                  </p>
                  <p>Amount: {amount}</p>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </li>
  );
};

export default TransactionItem;
