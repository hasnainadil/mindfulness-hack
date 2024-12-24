import { AppDataSource } from "../database";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { getChatById } from "./chat.service";
import { getUserById } from "./user.service";

const messageRepository = AppDataSource.getRepository(Message);

export async function createMessage(
    userId: number,
    chatId: number,
    content: string,
    isUser: boolean
): Promise<Message> {
    try {
        const chat = await getChatById(userId, chatId);
        const message = messageRepository.create({
            chat: chat,
            content: content,
            isUser: isUser
        })
        return await messageRepository.save(message);
    } catch (error) {
        throw error;
    }
}

export async function getMessages(userId: number, chatId: number): Promise<Message[]> {
    try {
        const chat = await getChatById(userId, chatId);
        return (await messageRepository.find({ where: { chat: chat } }));
    } catch (error) {
        throw error;
    }
}

