import redis from 'redis';

const CHANNELS = {
  BLOCKCHAIN: 'SMARTCHAIN',
  TRANSACTION: 'TRANSACTION',
};

export default class Network {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    // Ladda in alla kanaler...
    this.loadChannels();

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }

  handleMessage(channel, message) {
    console.log(`Got message ${message} on channel ${channel}`);
    const msg = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(msg, true, () => {
          this.transactionPool.clearBlockTransactions({ chain: msg });
        });
        break;
      case CHANNELS.TRANSACTION:
        if (
          !this.transactionPool.transactionExists({
            address: this.wallet.publicKey,
          })
        ) {
          this.transactionPool.addTransaction(msg);
        }
        break;
      default:
        return;
    }
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  loadChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }
}
