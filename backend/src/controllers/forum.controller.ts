import { Request, Response } from "express";
import { verifyToken } from "../utils/jwt-utils";
import { createQuestion, createReply, deleteQuestion, deleteReply, getQuestionById, getQuestions, getReplies, likeDisLikeQuestion, likeDisLikeReply } from "../services/forum.service";
import { StatusCodes } from "http-status-codes";
import { ExceptionEnum } from "../types/exceptiontypes";

async function createQuestionController(req: Request, res: Response) {
    try {
        const quesion = await createQuestion(req.body, verifyToken(req.cookies.access_token));
        res
            .status(StatusCodes.CREATED)
            .send({
                id: quesion.id,
                title: quesion.title,
                content: quesion.content,
                likes: quesion.likes,
            });
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function getQuestionsController(req: Request, res: Response) {
    try {
        // Get all questions for a user
        const questions = await getQuestions();
        res
            .status(StatusCodes.OK)
            .send(questions.map((question) => ({
                id: question.id,
                title: question.title,
                content: question.content,
                likes: question.likes,
            })));
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function getQuestionByIdController(req: Request, res: Response) {
    try {
        // Get a question by ID
        const questionId = parseInt(req.params.questionId);
        const question = await getQuestionById(questionId, verifyToken(req.cookies.access_token));
        res.status(StatusCodes.OK).send({
            id: question.id,
            title: question.title,
            content: question.content,
            likes: question.likes,
        });

    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}
async function likeDislikeQuestionController(req: Request, res: Response) {
    try {
        // Like a question
        const questionId = parseInt(req.params.questionId);
        const newQuestion = await likeDisLikeQuestion(questionId, verifyToken(req.cookies.access_token));
        res.status(StatusCodes.OK).send({ likes: newQuestion.likes });
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === ExceptionEnum.NOT_FOUND)
                res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function deleteQuestionController(req: Request, res: Response) {
    try {
        // Delete a question
        const questionId = parseInt(req.params.questionId);
        await deleteQuestion(questionId, verifyToken(req.cookies.access_token));
        res.status(StatusCodes.OK).send("Question deleted successfully");
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function createQuestionReplyController(req: Request, res: Response) {
    try {
        // Create a reply to a question
        const reply = await createReply(verifyToken(req.cookies.access_token), req.body);
        res
            .status(StatusCodes.OK)
            .send({
                id: reply.id,
                content: reply.content,
                likes: reply.likes,
            });
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function getRepliesController(req: Request, res: Response) {
    try {
        // Get all replies to a question
        const questionId = parseInt(req.params.questionId);
        const replies = await getReplies(questionId, verifyToken(req.cookies.access_token));
        res
            .status(StatusCodes.OK)
            .send(replies.map((reply) => ({
                id: reply.id,
                content: reply.content,
                likes: reply.likes,
            })));
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function likeDislikeReplyController(req: Request, res: Response) {
    try {
        // Like a reply
        const replyId = parseInt(req.params.replyId);
        const newReply = await likeDisLikeReply(replyId, verifyToken(req.cookies.access_token));
        res.status(StatusCodes.OK).send({ likes: newReply.likes });
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function deleteQuestionReplyController(req: Request, res: Response) {
    try {
        // Delete a reply
        const replyId = parseInt(req.params.replyId);
        await deleteReply(replyId, verifyToken(req.cookies.access_token));
        res.status(StatusCodes.OK).send("Reply deleted successfully");
    } catch (err) {
        if (err instanceof Error) {
            switch (err.message) {
                case ExceptionEnum.NOT_FOUND:
                    res.status(StatusCodes.NOT_FOUND).send(err.message);
                    break;
                case ExceptionEnum.UNAUTHORIZED:
                    res.status(StatusCodes.NOT_FOUND).send(err.message);
                    break;
                default:
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
            }
        }
    }
}

export {
    createQuestionController,
    getQuestionsController,
    getQuestionByIdController,
    likeDislikeQuestionController,
    deleteQuestionController,
    createQuestionReplyController,
    getRepliesController,
    likeDislikeReplyController,
    deleteQuestionReplyController
};



