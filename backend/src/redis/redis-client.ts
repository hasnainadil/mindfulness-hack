import Redis from 'ioredis';
import { saveChatToRag } from '../utils/communicate-ml';
import logger from '../logger/winston-log';

// Redis client for commands
const redis = new Redis({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

// Redis client for subscriber
const subscriber = new Redis({
  host: '127.0.0.1', // Redis server host
  port: 6379,        // Redis server port
});

const expiredChannel = '__keyevent@0__:expired';

// Subscribe to Redis Keyspace Notifications using the subscriber instance
subscriber.subscribe(expiredChannel, (err, count) => {
  if (err) {
    console.error('Failed to subscribe:', err);
  } else {
    logger.info(`Subscribed to ${expiredChannel}`);
  }
});

// Handle expiration events using the subscriber instance
subscriber.on('message', async (channel, message) => {
  logger.info(`Key expired: ${message} and channel: ${channel}`);
  if (channel === expiredChannel) {
    // Extract userId and chatId from the key
    const chatId = parseInt(message);
    // Call the Python server to save the chat to RAG
    await saveChatToRag(chatId);
  }
});

// Handle connection errors
redis.on('connect', () => {
  logger.info('Connected to Redis for commands');
});

subscriber.on('connect', () => {
  logger.info('Connected to Redis for subscription');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

subscriber.on('error', (err) => {
  console.error('Subscriber error:', err);
});

export { redis, subscriber };
