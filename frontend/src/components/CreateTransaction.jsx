import { useState } from 'react';
import ClientService from '../services/clientService';
import './CreateTransaction.css';

const CreateTransaction = ({ updateUnFinalizedTransactions }) => {
  // confirmation message for transaction success
  // Invisible if not signed in.
  // Send button will switch to sending animation while broadcasting transaction.
  // Has a text box displaying messages.

  // when transaction is added update the unFinalizedTransactions
  const [isSending, setIsSending] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendingTransaction = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setTransactionMessage('');
    try {
      const success = await new ClientService().sendTransaction(
        recipient,
        amount
      );
      if (success) {
        updateUnFinalizedTransactions();
        setTransactionMessage(
          'Transaction has been confirmed and will be included in the next block.'
        );
      }
    } catch (error) {
      setTransactionMessage(
        'Failed to send transaction. The server might be offline.'
      );
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSendingTransaction}>
      <h2>Send</h2>
      <div>
        <label>
          Pay to:
          <input
            type="text"
            name="recipient"
            placeholder="Recipient address"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            min="0"
            step="any"
            placeholder="0.00"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="button">Max</button>
        </label>
      </div>
      <button type="submit" disabled={isSending}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      <p>{transactionMessage}</p>
    </form>
  );
};

export default CreateTransaction;
