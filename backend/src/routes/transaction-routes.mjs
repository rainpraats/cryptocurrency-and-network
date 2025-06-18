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
  .get(listAllTransactions); // i just want to return a specific users transaction based on whatever protect adds to the req.user
router
  .route('/transactions/mine')
  .get(protect, authorize('miner', 'admin'), mineTransactions);
router.route('/info').get(protect, getWalletInfo);

export default router;
