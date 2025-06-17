class ClientService {
  async getLoginToken({ email, password }) {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      return result.data.token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUp({ email, password }) {
    try {
      const response = await fetch('http://localhost:3000/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const { success } = await response.json();
      return success;
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateToken() {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/validate',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const { success } = await response.json();
        return success;
      } else {
        console.error('Network response was not ok');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getChain() {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('http://localhost:3000/api/v1/blocks/', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const { data } = await response.json();
      return data.chain;
    } catch (error) {
      throw new Error(error);
    }
  }

  async mineBlock() {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/blockchain/mine',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWalletInfo() {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/wallet/info/',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async listTransactions() {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/wallet/transactions/',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendTransaction(recipient, amount) {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/wallet/transactions/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            recipient,
            amount: Number(amount),
          }),
        }
      );

      const { success } = await response.json();
      return success;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default ClientService;
