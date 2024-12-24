import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { AppDataSource, initializeAppDataSource } from "./database";
import dashboardRoutes from "./routes/dashboard";
import { deleteChatEntry, getChatEntry, setChatWithTTL } from "./redis/redis-func";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Hello from the Mindfulness Hack API!",
  });
});

app.get("/test-redis-set/:chatId", async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  console.log("chatId", chatId);
  // Call the Python server to save the chat to RAG
  setChatWithTTL(chatId, 30);
  res.status(StatusCodes.OK).send("Chat saved");
});

app.get("/test-redis-get/:chatId", async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  // Call the Python server to save the chat to RAG
  const chat = await getChatEntry(chatId);
  res.send(chat);
});

app.get("/test-redis-delete/:chatId", async (req, res) => {
  const chatId = parseInt(req.params.chatId);
  // Call the Python server to save the chat to RAG
  deleteChatEntry(chatId);
  res.send("Chat deleted");
});


(async () => {
  try {
    await initializeAppDataSource();
    console.log("AppDataSource is ready!");
    // Start your app here
  } catch (error) {
    console.error("Failed to initialize AppDataSource:", error);
    process.exit(1);
  }
})();


export default app;
