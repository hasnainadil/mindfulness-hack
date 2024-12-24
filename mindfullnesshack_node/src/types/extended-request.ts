// src/types/express.d.ts
import express, { Request } from 'express';

export interface ExtendedRequest extends Request {
  userId: number;
}

