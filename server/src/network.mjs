import redis from 'redis';

const CHANNELS = {
  TEST: 'TEST',
};

export default class Network {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Got message ${message} on channel ${channel}`);
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }
}

const test = new Network();
setTimeout(
  () => test.publish({ channel: CHANNELS.TEST, message: 'The message string' }),
  1500
);
