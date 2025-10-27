import { createAnthropic  } from "@ai-sdk/anthropic";
import { inngest } from "./client";
import { generateText } from "ai";
import {createOpenAI} from '@ai-sdk/openai'
import {createGoogleGenerativeAI} from '@ai-sdk/google'


const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})
const openai = createOpenAI()
const google = createGoogleGenerativeAI()

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: anthropicSteps } = await step.ai.wrap('anthropic-generate-text', generateText, {
      model: anthropic('claude-3-haiku-20240307'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2.',
    });
    const { steps: openaiSteps } = await step.ai.wrap('openai-generate-text', generateText, {
      model: openai('gpt-5'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2.',
    });
    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are a helpful assistant',
      prompt: 'What is 2+2.',
    });

    return{
      anthropicSteps,
      geminiSteps, 
      openaiSteps
    }
  },
);