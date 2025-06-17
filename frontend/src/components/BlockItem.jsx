import TransactionItem from './TransactionItem';

const BlockItem = ({ blockNumber, block }) => {
  return (
    <li>
      <details>
        <summary>
          <span>
            <p>{blockNumber}</p>
            <p>{new Date(block.timestamp).toLocaleString()}</p>
            <p>Txs: {block.data.length}</p>
          </span>
        </summary>
        <ul>
          {block.data.map((transaction) => (
            <TransactionItem
              key={`${block.hash}-${transaction.id}`}
              transaction={transaction}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default BlockItem;
