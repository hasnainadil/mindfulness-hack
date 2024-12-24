import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware"; 
import {
  createChatController,
  getChatsController,
  getChatByIdController,
  createMessageController,
  getMessagesForChatController,
  deleteChatController
} from "../controllers/chat.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateChatSchema, CreateMessageSchema } from "../dtos/chat.dto";

const chatRoutes = Router();

// Chat routes
chatRoutes.post("/chat", authMiddleware, validate(CreateChatSchema), createChatController);
chatRoutes.get("/chat", authMiddleware, getChatsController);
chatRoutes.get("/chat/:chatId", authMiddleware, getChatByIdController);
chatRoutes.delete("/chat/:chatId", authMiddleware, deleteChatController);

// Message routes
chatRoutes.post("/chat/message/:chatId", authMiddleware, validate(CreateMessageSchema),createMessageController);
chatRoutes.get("/chat/messages/:chatId", authMiddleware, getMessagesForChatController);

export default chatRoutes;