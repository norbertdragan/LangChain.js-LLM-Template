const basePrompt = `You are a helpful assistant. 

Use the following pieces of MemoryContext to answer the human. ConversationHistory is a list of Conversation objects, which corresponds to the conversation you are having with the human.
---
ConversationHistory: {history}
---
MemoryContext: {context}
---
Human: {prompt}
GPT Bot:`;

export default basePrompt;
