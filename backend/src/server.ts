import "reflect-metadata";
import dotenv from "dotenv";
// import app from "./app";
import { DynamicStructuredTool, Tool, tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { RunnableConfig } from "@langchain/core/runnables";
import app from "./app";
import logger from "./logger/winston-log";

dotenv.config();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

