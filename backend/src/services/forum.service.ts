import { AppDataSource } from "../database";
import { QuestionCreationDto, QuestionReplyDto } from "../dtos/forum.dto";
import { Question } from "../entities/question";
import { Reply } from "../entities/reply";
import { User } from "../entities/user";
import { ExceptionEnum } from "../types/exceptiontypes";
import { getUserById } from "./user.service";

const questionRepository = AppDataSource.getRepository(Question);
const replyRepository = AppDataSource.getRepository(Reply);

async function createQuestion(newQuestion: QuestionCreationDto, userId: number): Promise<Question> {
    const user = await getUserById(userId);
    const question = questionRepository.create({
        title: newQuestion.title,
        content: newQuestion.content,
        user: user
    })
    return await questionRepository.save(question);
}

async function getQuestions(): Promise<Question[]> {
    // get all questions
    const questions = await questionRepository.find();
    return questions
}

async function getQuestionById(questionId: number, userId: number): Promise<Question> {
    const question = await questionRepository.findOne({ where: { id: questionId } });
    if (!question) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    return question;
}

async function likeDisLikeQuestion(questionId: number, userId: number): Promise<Question> {
    const question = await questionRepository.findOne({ where: { id: questionId }, relations: ["likedBy"] });
    if (!question) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }

    // Check if the user has already liked the question
    const user = await getUserById(userId);
    if (!user) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }

    const likedBy = question.likedBy;
    if (likedBy.some((u) => u.id === user.id)) {
        // Unlike the question
        question.likes -= 1;
        question.likedBy = likedBy.filter((u) => u.id !== user.id);
    } else {
        // Like the question
        question.likes += 1;
        question.likedBy.push(user);
    }

    await questionRepository.save(question);
    return question;
}

async function deleteQuestion(questionId: number, userId: number) {
    const question = await questionRepository.findOne({ where: { id: questionId }, relations: ["user"] });
    if (!question) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const user = await getUserById(userId);
    if (question.user.id !== user.id) {
        throw new Error(ExceptionEnum.UNAUTHORIZED);
    }
    await questionRepository.delete(questionId);
}

async function createReply(userId: number, userReply: QuestionReplyDto): Promise<Reply> {
    const user = await getUserById(userId);
    const question = await questionRepository.findOne({ where: { id: userReply.questionId } });
    if (!question) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const reply = replyRepository.create({
        content: userReply.content,
        user: user,
        question: question
    })
    return await replyRepository.save(reply);
}

async function getReplies(questionId: number, userId: number): Promise<Reply[]> {
    const question = await questionRepository.findOne({ where: { id: questionId } });
    if (!question) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    return await replyRepository.find({ where: { question: question } });
}

async function likeDisLikeReply(replyId: number, userId: number): Promise<Reply> {
    const reply = await replyRepository.findOne({ where: { id: replyId }, relations: ["likedBy"] });
    if (!reply) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    // check if the user has already liked the reply
    const user = await getUserById(userId);
    const likedBy = reply.likedBy;
    if (likedBy.some((u) => u.id === user.id)) {
        // unlike the reply
        reply.likes -= 1;
        reply.likedBy = likedBy.filter((u) => u.id !== user.id);
    } else {
        // like the reply
        reply.likes += 1;
        reply.likedBy.push(user);
    }
    return await replyRepository.save(reply);
}

async function deleteReply(replyId: number, userId: number) {
    const reply = await replyRepository.findOne({ where: { id: replyId }, relations: ["user"] });
    if (!reply) {
        throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const user = await getUserById(userId);
    if (reply.user.id !== user.id) {
        throw new Error(ExceptionEnum.UNAUTHORIZED);
    }
    await replyRepository.delete(replyId);
}

export {
    createQuestion,
    getQuestions,
    getQuestionById,
    likeDisLikeQuestion,
    deleteQuestion,
    createReply,
    getReplies,
    likeDisLikeReply,
    deleteReply
}