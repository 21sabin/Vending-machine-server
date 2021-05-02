import express, { Request, Response } from 'express';
import { itemService } from '../services/itemService';
import httpResponse from '../../common/http-response';

const router = express();

router.get('/load', (request: Request, response: Response) => {
  itemService.loadInitialDataToDB().then((result) => {
    httpResponse.success(response,result)
  }).catch(error => {
    httpResponse.errorHandler(response, error)
  })
});

router.get('/', (request: Request, response: Response) => {
  itemService.getAllItems().then((items) => {
    httpResponse.success(response,items)
  }).catch(error => {
    httpResponse.errorHandler(response, error)
  })
});

router.post('/buy',(request:Request,response:Response)=>{
  itemService.buyItem(request.body).then((result) => {
  httpResponse.success(response,result)
}).catch(error => {
  httpResponse.errorHandler(response, error)
  })
})

router.post('/refund',(request:Request,response:Response)=>{
  itemService.refundItem(request.body).then((result) => {
  httpResponse.success(response,result)
}).catch(error => {
  httpResponse.errorHandler(response, error)
  })
})



export default router;