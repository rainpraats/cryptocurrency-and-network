import { useState } from 'react';
import BlockchainService from '../services/blockchainService';

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
      const success = await new BlockchainService().sendTransaction(
        recipient,
        amount
      );
      if (!success) {
        setTransactionMessage('Failed to send transaction.');
        throw new Error('Failed to send transaction.');
      }
      updateUnFinalizedTransactions();
      setTransactionMessage(
        'Transaction has been confirmed and will be included in the next block.'
      );
    } catch (error) {
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
