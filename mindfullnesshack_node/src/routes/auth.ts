import express, { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entities/user";
import { comparePassword, encryptPassword } from "../utils/encryption";
import { getToken } from "../utils/jwt-utils";
import { StatusCodes } from "http-status-codes";

const authRoutes = express.Router();
const userRepository = AppDataSource.getRepository(User);

authRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const { name, email, password, age, gender } = req.body;
        console.log(req.body);
        const existingUser = await userRepository.findOneBy({ email: email });
        if (existingUser) {
            res.status(StatusCodes.BAD_REQUEST).send({ error: "User already exists" });
            return;
        }
        const hashedPassword = await encryptPassword(password);
        const user = userRepository.create({ name, email, password: hashedPassword, age, gender });

        await userRepository.save(user);
        res.status(StatusCodes.CREATED).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "User registration failed" });
    }
});

authRoutes.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await userRepository.findOneBy({ email });
        if (!user || !(await comparePassword(password, user?.password))) {
            res.status(StatusCodes.UNAUTHORIZED).send({ error: "Invalid email or password" });
            return;
        }
        const token = getToken(user?.id);
        res.cookie("access_token", token, { httpOnly: true, maxAge: 3600000 });
        res.status(StatusCodes.OK).send({ message: "Login successful" });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "Login failed" });
    }
});

export default authRoutes;
