import TransactionItem from './TransactionItem';

const BlockItem = ({ blockNumber, block }) => {
  return (
    <li className="block-item">
      <p>{blockNumber}</p>
      <p>{new Date(block.timestamp).toLocaleString()}</p>
      <p>Txs: {block.data.length}</p>
    </li>
  );
};

export default BlockItem;
