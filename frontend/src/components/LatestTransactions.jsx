import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import ClientService from '../services/clientService';

const LatestTransactions = ({ usersBlocks, usersAddress }) => {
  const [finalizedTransactions, setFinalizedTransactions] = useState([]);

  useEffect(() => {
    const fetchUsersTransactions = async () => {
      try {
        const usersTransactions =
          await new ClientService().getUsersTransactions();
        if (usersTransactions) {
          setFinalizedTransactions(usersTransactions);
        }
      } catch (error) {
        console.error('Failed to fetch users transactions: ' + error);
      }
    };

    fetchUsersTransactions();
  }, [usersBlocks]);

  return (
    <>
      <h2>Latest Transactions</h2>
      <ul>
        {[...finalizedTransactions].reverse().map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            usersAddress={usersAddress}
          />
        ))}
      </ul>
    </>
  );
};

export default LatestTransactions;
