import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import ClientService from '../services/clientService';

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
    const fetchUsersBLocks = async () => {
      try {
        const usersTransactions =
          await new ClientService().getUsersTransactions();
        console.log(usersTransactions);
        if (usersTransactions) {
          setFinalizedTransactions(usersTransactions);
        }
      } catch (error) {
        console.error('Failed to fetch users transactions: ' + error);
      }
    };

    fetchUsersBLocks();
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
