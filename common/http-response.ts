import {Response } from 'express';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const common_utils = {
	errorHandler(response:Response, error:any) {
		response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message || null, ...error })
	},
	unAuthorized(response:Response, error:any) {
		response.status(error.statusCode || StatusCodes.UNAUTHORIZED).send({ message: error.message || error });
	},
	success(response:Response, data:any) {
		response.status(StatusCodes.OK).send(data);
	},
};

export default common_utils;
