import { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { getToken } from "../utils/jwt-utils";

const registerController = async (req: Request, res: Response) => {
    try {
        const user = await registerService(req.body);
        res.status(StatusCodes.CREATED).send({ message: "User registered successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
            return;
        }
        res.status(StatusCodes.BAD_REQUEST).send({ error: "User registration failed" });
    }
}

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await loginService(email, password);
        const token = getToken(user?.id);
        res.cookie("access_token", token, { httpOnly: true, maxAge: 3600000 });
        res.status(StatusCodes.OK).send({ message: "Login successful" });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: "Invalid email or password" });
    }
}

export { registerController, loginController };