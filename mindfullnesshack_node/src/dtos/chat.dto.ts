import { z } from "zod";

export const CreateChatSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character long.").max(255, "Title must be at most 255 characters long."),
})

export type CreateChatDto = z.infer<typeof CreateChatSchema>;

export const CreateMessageSchema = z.object({
    content: z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
    isUser: z.boolean(),
})

export type CreateMessageDto = z.infer<typeof CreateMessageSchema>;