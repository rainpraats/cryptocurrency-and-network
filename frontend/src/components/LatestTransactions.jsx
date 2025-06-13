import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';

const LatestTransactions = ({
  blockchain,
  updateUnFinalizedTransactions,
  unFinalizedTransactions,
}) => {
  // should rerender when blockchain updates
  // how do we rerender when a transaction is added?

  const [finalizedTransactions, setFinalizedTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  // get any transactions that arent in blocks
  useEffect(() => {
    updateUnFinalizedTransactions();
  }, [blockchain]);

  // get transactions that are in blocks
  useEffect(() => {
    const finalizedTransactions = blockchain.flatMap((block) => block.data);
    setFinalizedTransactions(finalizedTransactions);
  }, [blockchain]);

  // Put them together in right order.
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
