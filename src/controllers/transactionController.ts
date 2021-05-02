import express, { Request, Response } from 'express';
import { transactionService } from '../services';
import httpResponse from '../../common/http-response';

const router = express();

router.get('/', (request: Request, response: Response) => {
  transactionService.getAllTransactions().then((transactions) => {
    httpResponse.success(response,{data:transactions})
  }).catch(error => {
    response.json(error)
  })
});

router.get('/summary',(request: Request, response: Response)=>{
  transactionService.getTransactionsSummary().then((transactions) => {
    httpResponse.success(response,{data:transactions})
  }).catch(error => {
    response.json(error)
  })
})

export default router;