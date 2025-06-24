import blockchainModel from '../models/schemas/blockchain/blockchainModel.mjs';

export default class BlockchainRepository {
  async backupChain(chain) {
    return await blockchainModel.findOneAndUpdate(
      {},
      { chain: chain },
      { upsert: true, new: true }
    );
  }
}
