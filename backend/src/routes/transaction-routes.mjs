import express from 'express';
import {
  addTransaction,
  getWalletInfo,
  listAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { protect, authorize } from '../controllers/auth-controller.mjs';

const router = express.Router();

router
  .route('/transactions')
  .post(protect, addTransaction)
  .get(protect, listAllTransactions);
router
  .route('/transactions/mine')
  .get(protect, authorize('miner', 'admin'), mineTransactions);
router.route('/info').get(protect, getWalletInfo);

export default router;
