import TransactionItem from './TransactionItem';

const BlockItem = ({ blockNumber, block }) => {
  return (
    <li>
      <details>
        <summary>
          <p>{blockNumber}</p>
          <p>{new Date(block.timestamp).toLocaleString()}</p>
          <p>Txs: {block.data.length}</p>
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
