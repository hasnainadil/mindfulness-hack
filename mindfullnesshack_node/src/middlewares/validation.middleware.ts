// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next(); // Proceed to the next middleware/controller
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        next(err); // Pass the error to Express error handler
      }
    }
  };
