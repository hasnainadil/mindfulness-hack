import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware'; 
import { validate } from '../middlewares/validation.middleware';
import { QuestionCreationSchema, QuestionReplySchema } from '../dtos/forum.dto';
import {
  createQuestionController,
  getQuestionsController,
  getQuestionByIdController,
  likeDislikeQuestionController,
  deleteQuestionController,
  createQuestionReplyController,
  getRepliesController,
  likeDislikeReplyController,
  deleteQuestionReplyController
} from '../controllers/forum.controller';

const forumRoutes = Router();

forumRoutes.post("/question", authMiddleware, validate(QuestionCreationSchema), createQuestionController);

forumRoutes.get("/question", authMiddleware, getQuestionsController);

forumRoutes.get("/question/:questionId", authMiddleware, getQuestionByIdController);

forumRoutes.put("/question/vote/:questionId", authMiddleware, likeDislikeQuestionController);

forumRoutes.delete("/question/:questionId", authMiddleware, deleteQuestionController);

forumRoutes.post("/question/reply", authMiddleware, validate(QuestionReplySchema), createQuestionReplyController);

forumRoutes.get("/question/reply/:questionId", authMiddleware, getRepliesController);

forumRoutes.put("/question/reply/vote/:replyId", authMiddleware, likeDislikeReplyController);

forumRoutes.delete("/question/reply/:replyId", authMiddleware, deleteQuestionReplyController);

export default forumRoutes;