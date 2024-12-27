import { z } from "zod";

const CreateChatSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character long.").max(255, "Title must be at most 255 characters long."),
})

type CreateChatDto = z.infer<typeof CreateChatSchema>;

const CreateMessageSchema = z.object({
    content: z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
})

type CreateMessageDto = z.infer<typeof CreateMessageSchema>;

export {
    CreateChatSchema,
    CreateChatDto,
    CreateMessageSchema,
    CreateMessageDto
}