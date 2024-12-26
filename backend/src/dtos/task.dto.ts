import { z } from "zod";

const CreateTaskSchema = z.object({
    type: z.string(),
    description: z.string(),
});

type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

const UpdateTaskSchema = z.object({
    isCompleted: z.boolean(),
});

type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;

export {
    CreateTaskSchema,
    CreateTaskDto,
    UpdateTaskSchema,
    UpdateTaskDto
}