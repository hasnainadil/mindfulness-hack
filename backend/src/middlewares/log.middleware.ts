import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../logger/winston-log";


const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        logger.info(`Request method: ${req.method} -- URL: ${req.originalUrl}`);
        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

export { loggingMiddleware };