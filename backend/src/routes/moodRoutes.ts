import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    createMoodController,
    deleteMoodController,
    getMoodsController,
    getMoodsOnedayController
} from "../controllers/mood.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateMoodSchema } from "../dtos/mood.dto";

const moodRoutes = Router();

// Mood routes
moodRoutes.post("/mood", authMiddleware, validate(CreateMoodSchema), createMoodController);
moodRoutes.delete("/mood/:moodId", authMiddleware, deleteMoodController);
moodRoutes.get("/moods", authMiddleware, getMoodsController);
moodRoutes.get("/moods/oneday/", authMiddleware, getMoodsOnedayController);

export default moodRoutes;