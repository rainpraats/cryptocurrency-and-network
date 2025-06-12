const CreateTransaction = () => {
  // confirmation message for transaction success
  // Invisible if not signed in.
  // Send button will switch to sending animation while broadcasting transaction.
  // Has a text box displaying messages.
  return (
    <form>
      <h2>Send</h2>
      <div>
        <label>
          Pay to:
          <input type="text" name="recipient" placeholder="Recipient address" />
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
          />
          <button type="button">Max</button>
        </label>
      </div>
      <button type="submit">Send</button>
      <p>Placeholder text about transaction.</p>
    </form>
  );
};

export default CreateTransaction;
