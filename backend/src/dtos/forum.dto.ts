import { z } from "zod";

const QuestionCreationSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character long.").max(255, "Title must be at most 255 characters long."),
    content: z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
})

type QuestionCreationDto = z.infer<typeof QuestionCreationSchema>;

const QuestionLikeDislikeSchema = z.object({
    questionId: z.number().int().min(1, "Question ID must be a positive integer."),
})

type QuestionLikeDislikeDto = z.infer<typeof QuestionLikeDislikeSchema>;

const QuestionReplySchema = z.object({
    content: z.string().min(1, "Content must be at least 1 character long.").max(1000, "Content must be at most 1000 characters long."),
    questionId: z.number().int().min(1, "Question ID must be a positive integer."),
})

type QuestionReplyDto = z.infer<typeof QuestionReplySchema>;

export {
    QuestionCreationSchema,
    QuestionCreationDto,
    QuestionLikeDislikeSchema,
    QuestionLikeDislikeDto,
    QuestionReplySchema,
    QuestionReplyDto
}