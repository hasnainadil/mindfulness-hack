import { z } from "zod";

export const QuestionCreationSchema = z.object({
    title : z.string().min(1, "Title must be at least 1 character long.").max(255, "Title must be at most 255 characters long."),
    content : z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
    likes : z.number().int().min(0, "Likes must be a non-negative integer.").optional(),
})

export type QuestionCreationDto = z.infer<typeof QuestionCreationSchema>;

export const QuestionLikeDislikeSchema = z.object({
    questionId : z.number().int().min(1, "Question ID must be a positive integer."),
})

export type QuestionLikeDislikeDto = z.infer<typeof QuestionLikeDislikeSchema>;

export const QuestionReplySchema = z.object({
    content : z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
    questionId : z.number().int().min(1, "Question ID must be a positive integer."),
})

export type QuestionReplyDto = z.infer<typeof QuestionReplySchema>;