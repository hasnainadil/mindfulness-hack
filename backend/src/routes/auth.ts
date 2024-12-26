import express, { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entities/user";
import { comparePassword, encryptPassword } from "../utils/encryption";
import { getToken } from "../utils/jwt-utils";
import { StatusCodes } from "http-status-codes";
import { validate } from "../middlewares/validation.middleware";
import { LoginSchema, RegisterSchema } from "../dtos/auth.dto";
import { loginController, registerController } from "../controllers/auth.controller";

const authRoutes = express.Router();
const userRepository = AppDataSource.getRepository(User);

authRoutes.post("/register", validate(RegisterSchema), registerController);

authRoutes.post("/login", validate(LoginSchema), loginController);

export default authRoutes;
