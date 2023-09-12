import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
// console.log("Welcome to the LangChain Quickstart Module!");

// const template =
//   "You are a director of a social media with 30 years of experience. Please give me some ideas I whould write aboud regarding {topic}? the content is for {socialPlattform}. Translate to {languaje}";

// const prompt = new PromptTemplate({
//   template: template,
//   inputVariables: ["topic", "socialPlattform", "languaje"],
// });

// const formattedPromptTemplate = await prompt.format({
//   topic: "artificial intelligence",
//   socialPlattform: "twitter",
//   languaje: "spanish",
// });

// // console.log({ formattedPromptTemplate });

// const model = new OpenAI({ temperature: 0.9 });

// const chain = new LLMChain({ prompt: prompt, llm: model });

// const resChain = await chain.call({
//   topic: "artificial intelligence",
//   socialPlattform: "twitter",
//   languaje: "spanish",
// });

// // console.log({ resChain });

// //CHAIN => Pre defined --- 1. research => API Call 2. summarize research
// //AGENT = TASK + TOOLS + TEMPLATE => It figures out what to do

// const agentModel = new OpenAI({
//   temperature: 0,
//   modelName: "text-davinci-003",
// });

// const tools = [
//     new SerpAPI(process.env.SERPAPI_API_KEY, {
//       location: "Dallas,Texas,United States",
//       hl: "en",
//       gl: "us",
//     }),
//     new Calculator(),
//   ];

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//   agentType: "zero-shot-react-description",
//   verbose: true,
//   maxIterations: 5,
// });

// const input = "What is Langchain?";

// const result = await executor.call({ input });

// console.log(result);
// no le den bola al primer prompt

// ----------------------------------------------------------------------- PLAN AND ACTION AGENT ----------------------------------------------------------------------- //

// const tools = [
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     location: "Dallas,Texas,United States",
//     hl: "en",
//     gl: "us",
//   }),
//   new Calculator(),
// ];

// const chatModel = new ChatOpenAI({
//   temperature: 0,
//   modelName: "gpt-3.5-turbo",
//   verbose: true,
// });

// const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
//   llm: chatModel,
//   tools,
// });

// // no le decimos como hacerlo, le decimos QUE hacer
// const result = await executor.call({
//   input: "what is the age of messi plus 10 plus 10?",
// });

// console.log(result);

// ---------------------------------- MEMORY ----------------------------- //

const llm = new OpenAI({});
const memory = new BufferMemory();
const conversationChain = new ConversationChain({ llm: llm, memory: memory });

const res1 = await conversationChain.call({
  input: "Hey my name is Fernando",
});

console.log("Hey my name is Fernando");
console.log(res1);

const input2 = "whats my name?";
const res2 = await conversationChain.call({
  input: input2,
});

console.log(input2);
console.log(res2);

// const input3 = "what was my first interaction with you?";
// const res3 = await conversationChain.call({
//   input: input2,
// });

// console.log(input3);
// console.log(res3);
