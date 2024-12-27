import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createChat,
  getChats,
  getChatById,
  createMessage,
  getMessagesForChat,
  deleteChat
} from '../services/chat.service';
import { verifyToken } from '../utils/jwt-utils';
import { getAiReply } from '../ai-chat/model-utils';
import { getUserById } from '../services/user.service';
import { randomInt } from 'crypto';

async function createChatController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const { title } = req.body;
    const newChat = await createChat(userId, title);
    res.status(StatusCodes.CREATED).send({
      id: newChat.id,
      title: newChat.title,
      createdAt: newChat.createdAt
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  }
}

async function getChatsController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const chats = await getChats(userId);
    res
      .status(StatusCodes.OK)
      .send(chats.map(chat => ({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt
      })));

  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

async function getChatByIdController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const chatId = parseInt(req.params.chatId);
    const chat = await getChatById(userId, chatId);
    res
      .status(StatusCodes.OK)
      .send({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
        messages: chat.messages?.length > 0 ? chat.messages?.map(message => ({
          id: message.id,
          content: message.content,
          isUser: message.isUser,
          timestamp: message.timestamp
        })) : []
      });

  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

async function deleteChatController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const chatId = parseInt(req.params.chatId);
    await deleteChat(userId, chatId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

async function createMessageController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const chatId = parseInt(req.params.chatId);
    const { content } = req.body;
    await createMessage(chatId, content, true);
    const messages = await getMessagesForChat(chatId);
    const user = await getUserById(userId);
    const aiMessage = await getAiReply(messages, user);
    const newMessage = await createMessage(chatId, aiMessage, false);
    res
      .status(StatusCodes.CREATED)
      .send({
        id: newMessage.id,
        content: newMessage.content,
        isUser: newMessage.isUser,
        timeStamp: newMessage.timestamp
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  }
}

async function getMessagesForChatController(req: Request, res: Response) {
  try {
    const chatId = parseInt(req.params.chatId);
    const messages = await getMessagesForChat(chatId);
    res
      .status(StatusCodes.OK)
      .send(messages.map(message => ({
        id: message.id,
        content: message.content,
        isUser: message.isUser,
        timeStamp: message.timestamp
      })));
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

export {
  createChatController,
  getChatsController,
  getChatByIdController,
  deleteChatController,
  createMessageController,
  getMessagesForChatController
}