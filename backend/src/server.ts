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

// const multiply = tool(
//   async ({ a, b, nextModelInput }: { a: number; b: number, nextModelInput: string }, config: RunnableConfig): Promise<string | number> => {
//     /**
//      * Multiply a and b.
//      */
//     return (await bindedModel.invoke(`multiplication of ${a} and ${b} is ${a * b}. ${nextModelInput}`)).content.toString();
//   },
//   {
//     name: "multiply",
//     description: "Multiply two numbers. Put the post result instruction for the next model in nextModelInput.",
//     schema: z.object({
//       a: z.number(),
//       b: z.number(),
//       nextModelInput: z.string()
//     }),
//   }
// );

// const toolsDict = new Map<string, any>()
// toolsDict.set("multiply", multiply);

// const toolNode = new ToolNode([multiply]);

// // console.log("Hello, World!");
// const ChatModel = new ChatGoogleGenerativeAI({
//   model: "gemini-1.5-flash",
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const bindedModel = ChatModel.bindTools([multiply]);

// (async () => {
//   const response = await bindedModel.invoke("Hi there");
//   console.log(response);
//   const toolNodeResponse = await toolNode.invoke({ messages: [response] });
//   console.log(toolNodeResponse);
// })();
