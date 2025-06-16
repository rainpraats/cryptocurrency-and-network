import { Router } from 'express';
import {
  addBlock,
  listAllBlocks,
} from '../controllers/blockchain-controllers.mjs';
import { protect, authorize } from '../controllers/auth-controller.mjs';

const routes = Router();

routes.get('/', protect, listAllBlocks);
routes.post('/mine', protect, authorize('miner', 'admin'), addBlock);

export default routes;
