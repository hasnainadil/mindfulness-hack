import { RunnableConfig } from "@langchain/core/runnables";
import { DynamicStructuredTool, tool } from "@langchain/core/tools";
import { getJournalsFromVector } from "./model-utils";
import { z } from "zod";
import { ChatModel } from "./model-setup";
import Exa from "exa-js";
import { ExaSearchResults } from "@langchain/exa";

type ToolFuncReturnType = {
    content: string,
    nextModelInstruction: string
}

const toolsPool = new Map<string, DynamicStructuredTool<any>>()
const client = new Exa(process.env.EXASEARCH_API_KEY);
const ExatSearch = new ExaSearchResults({
    client,
    searchArgs: {
        numResults: 3,
    },
});

const GetJournalTool = tool(
    async ({ query, nextModelInstruction }: { query: string, nextModelInstruction: string }, config: RunnableConfig): Promise<ToolFuncReturnType> => {
        const userId = config.configurable?.userId
        const journals = await getJournalsFromVector(query)
        const userJournals = journals.filter(journal => journal.metadata.userId === userId)
        // so now this is the list of journals with the highest similarity to the query
        return {
            content: journals.map(journal => journal.pageContent).join("\n\n"),
            nextModelInstruction: nextModelInstruction
        }
    },
    {
        name: "query-from-daily-journal",
        description: "User writes a journal everyday. Use this when user may be mentioning something from their journals. Put the post result instruction for the next model in {nextModelInstruction}.",
        schema: z.object({
            query: z.string(),
            nextModelInstruction: z.string()
        }),
    }
)

const SearchWebTool = tool(
    async ({ query, nextModelInstruction }: { query: string, nextModelInstruction: string }, config: RunnableConfig): Promise<ToolFuncReturnType> => {
        const searchResults = await ExatSearch.invoke(query)
        return {
            content: searchResults?.results?.map((result: { title: string, text: string }) => `${result?.title}\n${result.text}`)?.join("\n\n") || [],
            nextModelInstruction: nextModelInstruction
        }
    },
    {
        name: "search-web",
        description: "Search the web. And give 3 results.",
        schema: z.object({
            query: z.string(),
            nextModelInstruction: z.string()
        }),
    }
)

toolsPool.set("query-from-daily-journal", GetJournalTool)
toolsPool.set("search-web", SearchWebTool)

export { toolsPool, ToolFuncReturnType }