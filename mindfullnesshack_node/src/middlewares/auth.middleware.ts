import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt-utils";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies?.access_token; // Replace 'authToken' with your cookie name
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized : No token provided' });
            return;
        }
        const userId = verifyToken(token);
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: Invalid token' });
            return;
        }
        // req.userId = userId; // Attach the user ID to the request object
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: Invalid token' });
    }
}
