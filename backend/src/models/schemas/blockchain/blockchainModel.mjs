import mongoose from 'mongoose';
import blockSchema from './blockSchema.mjs';

const blockchainSchema = new mongoose.Schema({
  chain: { type: [blockSchema], required: true },
});

export default mongoose.model('Blockchain', blockchainSchema);

// Only one blockchain document is expected
// const Blockchain = mongoose.model('Blockchain', blockchainSchema);

// Utility functions for replacing and retrieving the blockchain

// export async function getBlockchain() {
//   let blockchain = await Blockchain.findOne();
//   if (!blockchain) {
//     blockchain = await Blockchain.create({ chain: [] });
//   }
//   return blockchain.chain;
// }

// export async function replaceBlockchain(newChain) {
//   let blockchain = await Blockchain.findOne();
//   if (!blockchain) {
//     blockchain = await Blockchain.create({ chain: newChain });
//   } else {
//     blockchain.chain = newChain;
//     await blockchain.save();
//   }
//   return blockchain.chain;
// }
