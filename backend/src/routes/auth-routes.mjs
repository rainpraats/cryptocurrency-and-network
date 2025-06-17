import express from 'express';
import {
  loginUser,
  isTokenValidForUser,
} from '../controllers/auth-controller.mjs';

const router = express.Router();

router.route('/').post(loginUser);
router.route('/validate').get(isTokenValidForUser);

export default router;
