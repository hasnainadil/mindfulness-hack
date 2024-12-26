// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import logger from '../logger/winston-log';

const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse(req.body);
        next(); // Proceed to the next middleware/controller
      } catch (err) {
        logger.error(err);
        if (err instanceof ZodError) {
          res.status(400).json({ error: err.issues });
        } else {
          next(err); // Pass the error to Express error handler
        }
      }
    };

export { validate };
