"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const text_splitter_1 = require("langchain/text_splitter");
const vectorstores_1 = require("langchain/vectorstores");
const embeddings_1 = require("langchain/embeddings");
async function initializeStore() {
    const data = [];
    const files = await new Promise((resolve, reject) => (0, glob_1.default)("training/langchain/**/*.md", (err, files) => err ? reject(err) : resolve(files)));
    for (const file of files) {
        data.push(fs_1.default.readFileSync(file, "utf-8"));
    }
    console.log(`Added ${files.length} files to data.  Splitting text into chunks...`);
    const textSplitter = new text_splitter_1.CharacterTextSplitter({
        chunkSize: 2000,
        separator: "\n",
    });
    let docs = [];
    for (const d of data) {
        const docOutput = await textSplitter.splitText(d);
        docs = [...docs, ...docOutput];
    }
    console.log("Initializing Store...");
    const store = await vectorstores_1.HNSWLib.fromTexts(docs, docs.map((_, i) => ({ id: i })), new embeddings_1.OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
    }));
    console.clear();
    console.log("Saving Vectorstore");
    store.save("vectorStore");
    console.clear();
    console.log("VectorStore saved");
}
initializeStore();
