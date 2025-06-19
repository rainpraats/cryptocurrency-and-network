import { useState } from 'react';
import ClientService from '../services/clientService';
import BlockItem from './BlockItem';
import './LatestBlocks.css';

const LatestBlocks = ({ usersBlocks, setUsersBlocks, fetchWalletInfo }) => {
  const [isMining, setIsMining] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleMineBlock = async () => {
    setIsMining(true);
    setErrorMsg('');

    try {
      const success = await new ClientService().mineBlock();
      if (!success) throw new Error('Failed to mine block');
      const blocks = await new ClientService().getUsersBlocks();
      if (blocks) {
        setUsersBlocks(blocks);
      }
      fetchWalletInfo();
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
        {[...usersBlocks].reverse().map((block, index) => (
          <BlockItem
            key={block.hash}
            blockNumber={usersBlocks.length - index}
            block={block}
          />
        ))}
      </ul>
    </>
  );
};

export default LatestBlocks;
