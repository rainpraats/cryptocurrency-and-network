import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';

const LatestTransactions = ({
  blockchain,
  updateUnFinalizedTransactions,
  unFinalizedTransactions,
}) => {
  const [finalizedTransactions, setFinalizedTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    updateUnFinalizedTransactions();
  }, [blockchain]);

  useEffect(() => {
    const finalizedTransactions = blockchain.flatMap((block) => block.data);
    setFinalizedTransactions(finalizedTransactions);
  }, [blockchain]);

  useEffect(() => {
    setAllTransactions([
      ...unFinalizedTransactions,
      ...finalizedTransactions.reverse(),
    ]);
  }, [unFinalizedTransactions, finalizedTransactions]);
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
