import { AppDataSource } from "../database";
import { Task } from "../entities/task";
import { getUserById } from "./user.service";

const taskRepository = AppDataSource.getRepository(Task);


async function createTask(userId: number, type: string, description: string): Promise<Task> {
  try {
    const user = await getUserById(userId);
    const task = taskRepository.create({
      user: user,
      type: type,
      description: description,
      isCompleted: false
    });
    return await taskRepository.save(task);
  } catch (error) {
    throw error;
  }
}


async function updateTask(userId: number, taskId: number, isCompleted: boolean): Promise<Task> {
  try {
    const user = await getUserById(userId);
    const task = await taskRepository.findOneBy({ id: taskId, user: user });
    if (!task) {
      throw new Error("Task not found");
    }
    task.isCompleted = isCompleted;
    return await taskRepository.save(task);
  } catch (error) {
    throw error;
  }
}


async function getTasks(userId: number): Promise<Task[]> {
  try {
    const user = await getUserById(userId);
    return await taskRepository.find({ where: { user: user } });
  } catch (error) {
    throw error;
  }
}

export { createTask, updateTask, getTasks };