import { useState, useEffect } from 'react';
import CreateTransaction from '../components/CreateTransaction';
import LatestBlocks from '../components/LatestBlocks';
import BlockchainService from '../services/blockchainService';
import LatestTransactions from '../components/LatestTransactions';

const Home = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [unFinalizedTransactions, setUnFinalizedTransactions] = useState([]);

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

  const updateUnFinalizedTransactions = async () => {
    try {
      const transactionObj = await new BlockchainService().listTransactions();
      setUnFinalizedTransactions(Object.values(transactionObj));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  return (
    <>
      <CreateTransaction
        updateUnFinalizedTransactions={updateUnFinalizedTransactions}
      />
      <LatestBlocks blockchain={blockchain} setBlockchain={setBlockchain} />
      <LatestTransactions
        blockchain={blockchain}
        updateUnFinalizedTransactions={updateUnFinalizedTransactions}
        unFinalizedTransactions={unFinalizedTransactions}
      />
    </>
  );
};

export default Home;
