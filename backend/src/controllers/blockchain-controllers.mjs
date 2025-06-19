import BlockchainRepository from '../repositories/blockchain-repository.mjs';
import { blockChain } from '../server.mjs';
import { server } from '../server.mjs';

export const listAllBlocks = (req, res) => {
  res.status(200).json({ success: true, data: blockChain });
};
