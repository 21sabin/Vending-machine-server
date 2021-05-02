import express, { Request, Response } from 'express';
import  itemController  from '../src/controllers/itemController';
import transactionController from '../src/controllers/transactionController';
import creditController from '../src/controllers/creditController';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  response.json({
    message: 'Vending Machine API is up and running.'
  })
});

router.use('/credits',creditController);
router.use('/items',itemController);
router.use('/transactions',transactionController)

export default router;