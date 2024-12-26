// src/types/express.d.ts
import express, { Request } from 'express';

interface ExtendedRequest extends Request {
  userId: number;
}

export { ExtendedRequest };