import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createTaskController,
  updateTaskController,
  getTasksController
} from "../controllers/task.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateChatSchema } from "../dtos/chat.dto";
import { UpdateTaskSchema } from "../dtos/task.dto";

const taskRoutes = Router();

// Task routes
taskRoutes.post("/task", authMiddleware, validate(CreateChatSchema), createTaskController);
taskRoutes.put("/task/:taskId", authMiddleware, validate(UpdateTaskSchema), updateTaskController);
taskRoutes.get("/tasks", authMiddleware, getTasksController);

export default taskRoutes;