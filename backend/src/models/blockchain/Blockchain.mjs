import { createHash } from '../../utilities/hash.mjs';
import Block from './Block.mjs';
import Transaction from '../wallet/Transaction.mjs';
import Wallet from '../wallet/Wallet.mjs';
import { REWARD_ADDRESS, MINING_REWARD } from '../../utilities/config.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    // this.chain.push(Block.genesis())
  }

  addBlock({ data }) {
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain.at(-1),
      data,
    });
    this.chain.push(addedBlock);
  }

  // replaceChain tar in en lista av block...
  replaceChain(chain, shouldValidate, callback) {
    if (chain.length <= this.chain.length) return;

    if (!Blockchain.isValid(chain)) return;

    if (shouldValidate && !this.validateTransactionData({ chain })) {
      return;
    }

    if (callback) callback();

    this.chain = chain;
  }

  // Validerar inkommande lista av transaktioner mot aktuell instans och dess
  // lista av transaktioner...
  validateTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let rewardCount = 0;

      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_ADDRESS.address) {
          rewardCount += 1;

          // Regel 1: Kontrollera om det finns fler belöningstransaktion än 1.
          if (rewardCount > 1) {
            throw new Error('Too many rewards');
          }

          if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
            throw new Error('Invalid mining reward');
          }
        } else {
          if (!Transaction.validate(transaction)) {
            throw new Error('Invalid transaction');
          }

          const correctBalance = Wallet.calculateBalance({
            chain: this.chain,
            address: transaction.input.address,
          });

          if (transaction.input.amount !== correctBalance) {
            throw new Error('Wrong input amount, balance');
          }

          if (transactionSet.has(transaction)) {
            throw new Error(
              'The same transaction has already been added to the block'
            );
          } else {
            transactionSet.add(transaction);
          }
        }
      }
    }
    return true;
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // Testa hela kedjan för att hitta eventuella felaktigheter...
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash, nonce, difficulty } =
        chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) return false;

      const validHash = createHash(
        timestamp,
        data,
        lastHash,
        nonce,
        difficulty
      );
      if (hash !== validHash) return false;
    }

    return true;
  }
}
