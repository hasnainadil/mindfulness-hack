import { AIMessage, HumanMessage, SystemMessage, MessageContentComplex } from "@langchain/core/messages";
import type { Document } from "@langchain/core/documents";
import { Message } from "../entities/message";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatModel, vectorStorage } from "./model-setup";
import { User } from "../entities/user";
import { Journal } from "../entities/journals";
import { VectorStorageType } from "../types/vectorstorage";
import { tool } from "@langchain/core/dist/tools";
import { string, z } from "zod";
import { RunnableConfig } from "@langchain/core/runnables";
import { toolsPool } from "./tools";
import { ExceptionEnum } from "../types/exceptiontypes";
import logger from "../logger/winston-log";

const chatPromptTemplate = ChatPromptTemplate.fromMessages([
    new SystemMessage("You are a helpful chat bot that provides emotional and mental support to user. Just talk normally and check how the user is feeling and act accordingly to cheer him/her up if needed. User info is:Id: {userid} , name: {username} , age : {userage} , gender : {usergender}. The start of your conversation is {firstMessageTime}"),
    new MessagesPlaceholder("msgs")
])

async function getAiReply(messages: Message[], user: User): Promise<string> {
    // sort the messages with the latest message as last of the array 
    messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const model_input_array = messages.map((message) => {
        if (message.isUser) {
            return new HumanMessage(message.content)
        }
        else {
            return new AIMessage(message.content)
        }
    })
    logger.info(`Model input array:`)
    console.log(model_input_array)
    const chainedChatModel = chatPromptTemplate.pipe(ChatModel)
    const model_output = await chainedChatModel.invoke({
        userid: user.id,
        username: user.name,
        userage: user.age,
        usergender: user.gender,
        firstMessageTime: messages[0].timestamp.toISOString(),
        msgs: model_input_array
    })
    logger.info(`Model output`)
    console.log(model_output)
    if (Array.isArray(model_output.content) && model_output.tool_calls && model_output.tool_calls?.length > 0) {
        // checking if there is any tool call be done??
        return toolCallingChain(model_output, user.id);
    }
    // check if the model output is an array of messages
    return model_output.content.toString();
}

async function toolCallingChain(aiMessage: AIMessage, userId: number, toolCallingChainId: number = 1): Promise<string> {
    logger.info(`Tool calling chain id: ${toolCallingChainId} with message:`)
    console.log(aiMessage)
    let nextModelInput = "";
    if (aiMessage.content instanceof String || typeof aiMessage.content === "string") {
        return aiMessage.content as string;
    }
    if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
        const tool_call = aiMessage.tool_calls[0];
        const tool = toolsPool.get(tool_call.name);
        if (tool) {
            const { content, nextModelInstruction } = await tool.invoke(tool_call.args, { configurable: { userId: userId } });
            logger.info(`Tool call content:`)
            console.log(content)
            logger.info(`Tool call next model instruction:`)
            console.log(nextModelInstruction)
            if (nextModelInstruction.trim() !== "") {
                nextModelInput = `tool_name: ${tool_call.name}, tool_returned: ${content},instruction from previous model for next model: ${nextModelInstruction}`;
                logger.info(`Next model input: ${nextModelInput}`)
                const modelResponse = await ChatModel.invoke(nextModelInput);
                logger.info(`Model response:`)
                console.log(modelResponse)
                return await toolCallingChain(modelResponse, userId, toolCallingChainId + 1);
            }
            else {
                return content;
            }
        }
        else {
            throw new Error(ExceptionEnum.INTERNAL_SERVER_ERROR);
        }
    }
    return aiMessage.content.toString();
}

async function getJournalsFromVector(query: string): Promise<Document[]> {
    return await vectorStorage.similaritySearch(query, 4, { type: VectorStorageType.JOURNAL });
}

async function saveJournalVector(userId: number, journal: Journal): Promise<number> {
    const document: Document = {
        pageContent: `${journal.title}\n ${journal.content}`,
        metadata: {
            userId: userId,
            type: VectorStorageType.JOURNAL,
            createdAt: journal.createdAt.toISOString(),
            id: journal.id
        }
    }
    return parseInt((await vectorStorage.addDocuments([document], { ids: [journal.id.toString()] }))[0]);
}

async function removeJournalVector(journal: Journal) {
    await vectorStorage.delete({ ids: [journal.id.toString()] });
}

export { getAiReply, getJournalsFromVector, saveJournalVector, removeJournalVector };