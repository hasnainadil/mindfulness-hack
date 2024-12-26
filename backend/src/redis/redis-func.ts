import { redis } from "./redis-client";


// Function to create or update an entry with TTL
const setChatWithTTL = async (chatId: number, ttl: number) => {
    const key = chatId.toString();
    await redis.set(key, (new Date()).toISOString(), 'EX', ttl); // 'EX' sets expiration in seconds
};

// Function to delete an entry
const deleteChatEntry = async (chatId: number) => {
    const key = chatId.toString();
    await redis.del(key);
};

// Function to fetch an entry
const getChatEntry = async (chatId: number) => {
    const key = chatId.toString();
    const value = await redis.get(key);
    return value;
};

export { setChatWithTTL, deleteChatEntry, getChatEntry };