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
              key={transaction.id}
              transaction={transaction}
              blockTimestamp={block.timestamp}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default BlockItem;
