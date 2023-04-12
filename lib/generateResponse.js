import dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models";
import { LLMChain, PromptTemplate } from "langchain";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import promptTemplate from "./basePrompt.js";

dotenv.config();

// Load the Vector Store from the `vectorStore` directory
const store = await HNSWLib.load(
  "vectorStore",
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
);
console.clear();

// OpenAI Configuration
const model = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4",
});

// Parse and initialize the Prompt
const prompt = new PromptTemplate({
  template: promptTemplate,
  inputVariables: ["history", "context", "prompt"],
});

// Create the LLM Chain
const llmChain = new LLMChain({
  llm: model,
  prompt,
});

/**
 * Generates a Response based on history and a prompt.
 * @param {string} history -
 * @param {string} prompt - Th
 */
const generateResponse = async ({ history, prompt }) => {
  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 1);
  const context = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`);
  });

  return await llmChain.predict({
    prompt,
    context: context.join("\n\n"),
    history,
  });
};

export default generateResponse;
