import { useState, useEffect } from 'react';
import CreateTransaction from '../components/CreateTransaction';
import LatestBlocks from '../components/LatestBlocks';
import BlockchainService from '../services/blockchainService';
import LatestTransactions from '../components/LatestTransactions';

const Home = () => {
  const [blockchain, setBlockchain] = useState([]);

  useEffect(() => {
    if (blockchain.length) return;

    const fetchBlockchain = async () => {
      try {
        const chain = await new BlockchainService().getChain();
        setBlockchain(chain);
      } catch (error) {
        console.error('Failed to fetch blockchain:', error);
      }
    };

    fetchBlockchain();
  }, [blockchain]);

  useEffect(() => {
    if (!blockchain) return;
    console.log(blockchain);
  }, [blockchain]);

  return (
    <>
      <CreateTransaction />
      <LatestBlocks blockchain={blockchain} />
      <LatestTransactions blockchain={blockchain} />
    </>
  );
};

export default Home;
