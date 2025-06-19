import express from 'express';
import {
  addUser,
  listUsers,
  listUsersBlocks,
  listUsersTransactions,
} from '../controllers/user-controller.mjs';
import { authorize, protect } from '../controllers/auth-controller.mjs';

const router = express.Router();

router.route('/').get(listUsers).post(addUser);
router
  .route('/blocks')
  .get(protect, authorize('miner', 'admin'), listUsersBlocks);
router.route('/transactions').get(protect, listUsersTransactions);

export default router;
