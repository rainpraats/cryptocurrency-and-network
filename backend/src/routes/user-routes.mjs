import express from 'express';
import { addUser, listUsers } from '../controllers/user-controller.mjs';

const router = express.Router();

router.route('/').get(listUsers).post(addUser);

export default router;
