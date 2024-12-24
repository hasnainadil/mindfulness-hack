import { redis } from "./redis-client";


// Function to create or update an entry with TTL
export const setChatWithTTL = async (chatId: number, ttl: number) => {
    const key = chatId.toString();
    console.log(`Setting chat ${chatId} with TTL ${ttl}s`);
    await redis.set(key, (new Date()).toISOString(), 'EX', ttl); // 'EX' sets expiration in seconds
    console.log(`Set chat ${chatId} with TTL ${ttl}s`);
};

// Function to delete an entry
export const deleteChatEntry = async (chatId: number) => {
    const key = chatId.toString();
    await redis.del(key);
    console.log(`Deleted chat ${chatId}`);
};

// Function to fetch an entry
export const getChatEntry = async (chatId: number) => {
    const key = chatId.toString();
    const value = await redis.get(key);
    return value;
};
