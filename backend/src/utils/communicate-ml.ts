import { getUserIdByChatId } from "../services/chat.service";

const saveChatToRag = async (chatId: number) => {
    console.log(`Saving chat ${chatId} to RAG`);
    // const userId = await getUserIdByChatId(chatId);
    // console.log(`Saving chat ${chatId} to RAG for user ${userId}`);
};

export { saveChatToRag };