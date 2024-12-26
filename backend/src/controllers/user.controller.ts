import { Request, Response } from "express";
import { getUserIdByChatId } from "../services/chat.service";
import { getUserById, updateUserProfile } from "../services/user.service";
import { ExceptionEnum } from "../types/exceptiontypes";
import { verifyToken } from "../utils/jwt-utils";
import { StatusCodes } from "http-status-codes";

const getUserProfileController = async (req: Request, res: Response) => {
    try {
        const userId = verifyToken(req.cookies?.access_token);
        const user = await getUserById(userId);
        res.status(StatusCodes.OK).send({
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === ExceptionEnum.NOT_FOUND) {
                res.status(StatusCodes.NOT_FOUND).send({ error: "User not found" });
                return;
            }
        }
    }
}

const updateUserProfileController = async (req: Request, res: Response) => {
    try {
        const userId = verifyToken(req.cookies?.access_token);
        // req.body contains the partial user object with the updated fields
        await updateUserProfile(userId, req.body);
        res.status(StatusCodes.OK).send({ message: "User profile updated successfully" });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === ExceptionEnum.NOT_FOUND) {
                res.status(StatusCodes.NOT_FOUND).send({ error: "User not found" });
                return;
            }
        }
    }
}

export {
    getUserProfileController,
    updateUserProfileController
}