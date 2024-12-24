import { z } from "zod";

export const CreateTaskSchema = z.object({
    type: z.string(),
    description: z.string(),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
    isCompleted: z.boolean(),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;