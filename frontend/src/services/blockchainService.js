class BlockchainService {
  constructor() {}

  async getChain() {
    try {
      const response = await fetch('http://localhost:3000/api/blocks/');
      if (!response.ok) throw new Error('Network response was not ok.');
      const { data } = await response.json();
      return data.chain;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mineBlock() {
    try {
      const response = await fetch(
        'http://localhost:3000/api/wallet/transactions/mine/'
      );
      if (!response.ok) throw new Error('Network response was not ok.');
      const { success } = await response.json();
      return success;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWalletInfo() {
    try {
      const response = await fetch('http://localhost:3000/api/wallet/info/');
      if (!response.ok) throw new Error('Network response was not ok.');
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async listTransactions() {
    try {
      const response = await fetch(
        'http://localhost:3000/api/wallet/transactions/'
      );
      if (!response.ok) throw new Error('Network response was not ok.');
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendTransaction(recipient, amount) {
    try {
      const response = await fetch(
        'http://localhost:3000/api/wallet/transactions/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipient, amount }),
        }
      );
      if (!response.ok) throw new Error('Network response was not ok.');
      const { success } = await response.json();
      return success;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default BlockchainService;
