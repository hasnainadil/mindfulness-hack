import 'dotenv/config';
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Task } from "./entities/task";
import { Reply } from "./entities/reply";
import { Question } from "./entities/question";
import { Mood } from "./entities/mood";
import { Message } from "./entities/message";
import { Journal } from "./entities/journals";
import { Chat } from './entities/chat';
import mysql from "mysql2/promise";
import logger from './logger/winston-log';

// Function to create the database if it doesn't exist
const ensureDatabaseExists = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST || "localhost",
    user: DB_USER || "root",
    password: DB_PASSWORD || "root",
  });

  try {
    // Check if the database exists and create it if not
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  } catch (err) {
    logger.error("Error ensuring database exists:", err);
    throw err;
  } finally {
    await connection.end();
  }
};

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'mindfullnesshack',
  synchronize: true,
  entities: [User, Task, Reply, Question, Mood, Message, Journal, Chat],
});

// Ensure database exists and initialize the data source
const initializeAppDataSource = async () => {
  await ensureDatabaseExists(); // Ensure the database exists
  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");
  } catch (err) {
    logger.error("Error during Data Source initialization:", err);
    throw err;
  }
};

export { AppDataSource, initializeAppDataSource };