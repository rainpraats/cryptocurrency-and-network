import BlockItem from './BlockItem';

const LatestBlocks = ({ blockchain }) => {
  return (
    <>
      <h2>Latest Blocks</h2>
      <button>Mine Block</button>
      <ul>
        {[...blockchain].reverse().map((block, index) => (
          <BlockItem
            key={block.hash}
            blockNumber={blockchain.length - index}
            block={block}
          />
        ))}
      </ul>
    </>
  );
};

export default LatestBlocks;
