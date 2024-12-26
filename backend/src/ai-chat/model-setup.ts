// import { DynamicRetrievalMode, GoogleSearchRetrievalTool } from "@google/generative-ai";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { toolsPool } from "./tools";
import logger from "../logger/winston-log";

// const searchRetrievalTool: GoogleSearchRetrievalTool = {
//   googleSearchRetrieval: {
//     dynamicRetrievalConfig: {
//       mode: DynamicRetrievalMode.MODE_DYNAMIC,
//       dynamicThreshold: 0.75, // default is 0.7
//     },
//   },
// };

const ChatModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY
}).bindTools([
  ...toolsPool.values()
]);

const embeddingModel = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY
})

const vectorStorage = new Chroma(embeddingModel, {
  collectionName: "mindfulness-hack",
  url: "http://localhost:8000", // Optional, will default to this value
  collectionMetadata: {
    "hnsw:space": "cosine",
  },
});
logger.info("Vector storage ready!");


export {
  ChatModel,
  vectorStorage
};