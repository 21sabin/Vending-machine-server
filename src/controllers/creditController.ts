import express, { Request, Response } from 'express';
import { creditService } from '../services';
import httpResponse from '../../common/http-response';

const router = express();

router.get('/', (request: Request, response: Response) => {
  creditService.getInitialCredit().then((credit) => {
    httpResponse.success(response,credit)
  }).catch(error => {
    response.json(error)
  })
});

router.post('/', (request: Request, response: Response) => {
  creditService.createCredit().then((result) => {
    httpResponse.success(response,result)
  }).catch(error => {
    response.json(error)
  })
});

export default router;