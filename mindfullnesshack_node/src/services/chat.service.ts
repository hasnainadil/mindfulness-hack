import { AppDataSource } from "../database";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { getUserById } from "./user.service";

const chatRepository = AppDataSource.getRepository(Chat);
const messageRepository = AppDataSource.getRepository(Message);

export async function createChat(userId: number, title: string): Promise<Chat> {
    try {
        const user = await getUserById(userId);
        const chat = chatRepository.create({
            user: user,
            title: title,
        });
        return await chatRepository.save(chat);

    } catch (error) {
        throw error;
    }
}

export async function getChats(userId: number): Promise<Chat[]> {
    try {
        const user = await getUserById(userId);
        const chats = (await chatRepository.find({ where: { user: user } }));
        return chats
    } catch (error) {
        throw error;
    }
}

export async function getChatById(userId: number, chatId: number): Promise<Chat> {
    try {
        const user = await getUserById(userId);
        const chat = await chatRepository.findOneBy({ id: chatId, user: user });
        if (!chat) {
            throw new Error("Chat not found");
        }
        return chat;
    } catch (error) {
        throw error;
    }
}

export async function deleteChat(userId: number, chatId: number): Promise<void> {
    try {
        const user = await getUserById(userId);
        const chat = await chatRepository.findOneBy({ id: chatId, user: user });
        if (!chat) {
            throw new Error("Chat not found");
        }
        await chatRepository.remove(chat);
    } catch (error) {
        throw error;
    }
}

export async function getUserIdByChatId(chatId: number): Promise<number> {
    try {
        const chat = await chatRepository.findOne({ where: { id: chatId } });
        if (!chat) {
            throw new Error("Chat not found");
        }
        return chat.user.id;
    } catch (error) {
        throw error;
    }
}

export async function createMessage(chatId: number, userId: number, content: string, isUser: boolean): Promise<Message> {
    try {
        const chat = await chatRepository.findOneBy({ id: chatId });
        if (!chat) {
            throw new Error("Chat not found");
        }
        const message = messageRepository.create({
            chat: chat,
            content: content,
            isUser: isUser
        });
        const newMessage = await messageRepository.save(message);
        return newMessage;
    } catch (error) {
        throw error;
    }
}

export async function getMessagesForChat(chatId: number): Promise<Message[]> {
    try {
        const chat = await chatRepository.findOneBy({ id: chatId });
        if (!chat) {
            throw new Error("Chat not found");
        }
        const messages = await messageRepository.find({ where: { chat: chat } });
        return messages;
    } catch (error) {
        throw error;
    }
}