# LangChain.js LLM Template

This is a LangChain LLM template that allows you to train your own custom AI model on any data you want.

## Setup

1. Provide all the information you want your LLM to be trained on in the `training` directory in markdown files. Folder depth doesn't matter.
2. Add your OpenAI API key in the .env file as `OPENAI_API_KEY`.
3. Run `yarn train` or `npm train` to set up your vector store.
4. Modify the base prompt in `lib/basePrompt.js`
5. Run `yarn start`, and start playing around with it!

Forked from: https://github.com/Conner1115/LangChain.js-LLM-Template
