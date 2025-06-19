import { Router } from 'express';
import { listAllBlocks } from '../controllers/blockchain-controllers.mjs';

const routes = Router();

routes.get('/', listAllBlocks);

export default routes;
