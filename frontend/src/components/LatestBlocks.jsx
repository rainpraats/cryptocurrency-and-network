import { useState } from 'react';
import BlockchainService from '../services/blockchainService';
import BlockItem from './BlockItem';

const LatestBlocks = ({ blockchain, setBlockchain }) => {
  const [isMining, setIsMining] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleMineBlock = async () => {
    setIsMining(true);
    setErrorMsg('');

    try {
      const success = await new BlockchainService().mineBlock();
      if (!success) throw new Error('Failed to mine block');
      const chain = await new BlockchainService().getChain();
      setBlockchain(chain);
    } catch (error) {
      setErrorMsg('Could not mine block. Please try again.');
      console.error(error);
    } finally {
      setIsMining(false);
    }
  };

  return (
    <>
      <h2>Latest Blocks</h2>
      <p>{errorMsg}</p>
      <button onClick={handleMineBlock} disabled={isMining}>
        {isMining ? 'Mining...' : 'Mine Block'}
      </button>
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
