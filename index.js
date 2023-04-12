import dotenv from "dotenv";
dotenv.config();
import generateResponse from "./lib/generateResponse.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

const conversationHistory = [];

while (true) {
  const question = prompt("Ask a question >");
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory,
  });

  console.log(`GPT Bot: ${answer}\n`);

  conversationHistory.push(`Human: ${question}`, `GPT Bot: ${answer}`);
}
