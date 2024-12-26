import express, { NextFunction, Request, Response } from "express";
import { User } from "../entities/user";
import { AppDataSource } from "../database";
import { verifyToken } from "../utils/jwt-utils";
import { ExceptionEnum } from "../types/exceptiontypes";
import { getUserById } from "../services/user.service";
import { getUserProfileController, updateUserProfileController } from "../controllers/user.controller";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middlewares/auth.middleware";

import forumRoutes from "./forumRoutes";
import chatRoutes from "./chatRoutes";
import taskRoutes from "./taskRoutes";
import journalRoutes from "./journalRoutes";
import moodRoutes from "./moodRoutes";
import { validate } from "../middlewares/validation.middleware";
import { ProfileUpdateSchema } from "../dtos/profile.dto";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/profile", authMiddleware, getUserProfileController);

dashboardRoutes.put("/profile", authMiddleware, validate(ProfileUpdateSchema), updateUserProfileController);

dashboardRoutes.use('/forum', forumRoutes);

dashboardRoutes.use(chatRoutes)
dashboardRoutes.use(taskRoutes);
dashboardRoutes.use(journalRoutes);
dashboardRoutes.use(moodRoutes);

export default dashboardRoutes;