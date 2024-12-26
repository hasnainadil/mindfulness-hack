import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createTask,
  updateTask,
  getTasks
} from '../services/task.service';
import { verifyToken } from '../utils/jwt-utils';

async function createTaskController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const { type, description } = req.body;
    const newTask = await createTask(userId, type, description);
    res
      .status(StatusCodes.CREATED)
      .send({
        id: newTask.id,
        type: newTask.type,
        description: newTask.description,
        isCompleted: newTask.isCompleted
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  }
}

async function updateTaskController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const taskId = parseInt(req.params.taskId);
    const { isCompleted } = req.body;
    const updatedTask = await updateTask(userId, taskId, isCompleted);
    res
      .status(StatusCodes.OK)
      .send({
        id: updatedTask.id,
        type: updatedTask.type,
        description: updatedTask.description,
        isCompleted: updatedTask.isCompleted
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  }
}

async function getTasksController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const tasks = await getTasks(userId);
    res
      .status(StatusCodes.OK)
      .send(tasks.map(task => ({
        id: task.id,
        type: task.type,
        description: task.description,
        isCompleted: task.isCompleted
      })));
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

export {
  createTaskController,
  updateTaskController,
  getTasksController
};