import { useEffect, useState } from 'react';
import BlockchainService from '../services/blockchainService';
import TransactionItem from './TransactionItem';

const LatestTransactions = ({ blockchain }) => {
  // should rerender when blockchain updates
  // how do we rerender when a transaction is added?
  const [unfinalizedTransactions, setUnfinalizedTransactions] = useState([]);
  const [finalizedTransactions, setFinalizedTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  // get any transactions that arent in blocks
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionObj = await new BlockchainService().listTransactions();
        setUnfinalizedTransactions(Object.values(transactionObj));
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, [blockchain]);

  // get transactions that are in blocks
  useEffect(() => {
    const finalizedTransactions = blockchain.flatMap((block) => block.data);
    setFinalizedTransactions(finalizedTransactions);
  }, [blockchain]);

  // Put them together in right order.
  useEffect(() => {
    setAllTransactions([
      ...unfinalizedTransactions.reverse(),
      ...finalizedTransactions.reverse(),
    ]);
  }, [unfinalizedTransactions, finalizedTransactions]);
  return (
    <>
      <h2>Latest Transactions</h2>
      <ul>
        {allTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default LatestTransactions;
