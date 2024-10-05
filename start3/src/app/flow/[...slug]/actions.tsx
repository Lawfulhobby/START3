// @ts-nocheck
'use server';

import { BotCard, BotMessage } from '@/components/llm/message';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage, ToolInvocation } from 'ai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { z } from 'zod';
import { ServerSideMarkdown } from '@/components/server/ServerSideMarkdown';
import { ServerSideSendTx } from '@/components/create-transaction/ServerSideSendTx';
import { ServerSideReward } from '@/components/marketing/ServerSideReward';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Sleep function to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Define the type for the content structure
interface ContentStep {
  step: number;
  title: string;
  content: string;
}

interface Content {
  name: string;
  description: string;
  steps: ContentStep[];
  rewardInstructions: string;
}

// Fetch content from the database using Prisma based on `id`
export async function fetchContentFromDb(id: string): Promise<Content | null> {
  try {
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        steps: true, // Assuming `steps` is a relation in your Prisma schema
      },
    });

    if (!content) {
      throw new Error(`Content with id '${id}' not found`);
    }

    return content;
  } catch (error) {
    console.error(`Error fetching content: ${error.message}`);
    return null;
  }
}

// Function to format the content into a structured format
export async function getContent(id: string): Promise<string> {
  try {
    const content = await fetchContentFromDb(id);

    if (!content) {
      throw new Error(`Content with id '${id}' not found`);
    }
    
    // const formattedContent = `\
    // ${content.description}
    
    // Messages inside [] indicate a UI element or a user event. For example:
    // - "[Question: What is your first name?]" means that the question is shown to the user.
    
    // ${content.steps.map(step => `
    // ${step.step}. ${step.title}:
    //   - ${step.content}
    // `).join('\n')}
    
    // ${content.rewardInstructions}
    // `;

    // return formattedContent;

    const formattedContent = `\
    You are an onboarding assistant for a Web3 project. Use the following description for more understanding:
    ${content.description}
    
    Messages inside [] indicate a UI element or a user event. For example:
    - "[Question: What is your first name?]" means that the question is shown to the user.
    - "[Question UI: 1]" meants the UI component shown to the user
    
    Ask the following questions one by one:
    ${content.steps.map(step => `
    ${step.step}. ${step.title} ${step.content}
    `).join('\n')}
    
    Before they continue to get the reward, ask if the user is okay if the data is saved. Ask them to respond with ‘I agree’ if they do.

    Once all the questions are answered, the onboarding is complete. Call ${content.rewardInstructions}
    `;

    return formattedContent;
    
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

// Function to send a message and get a response from the AI, with dynamic content based on `id`
export async function sendMessage(message: string, id: string): Promise<{
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
}> {

  const history = getMutableAIState<typeof AI>();

  history.update([
    ...history.get(),
    {
      role: 'user',
      content: message,
    },
  ]);

  // Fetch content based on the `id` passed
  const systemContent = await getContent(id);

  const reply = await streamUI({
    model: openai('gpt-4o-2024-05-13'),
    messages: [
      {
        role: 'system',
        content: systemContent,
        toolInvocations: [],
      },
      ...history.get(),
    ] as CoreMessage[],
    initial: (
      <BotMessage className="items-center flex shrink-0 select-none justify-center">
        <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done) history.done([...history.get(), { role: 'assistant', content }]);

      const questionMatch = content.match(/\[Question: (.*?)\]/);
      const questionNumberMatch = content.match(/\[Question UI: (.*?)\]/);

      const question = questionMatch ? questionMatch[1] : '';

      const remainingContent = content
        .replace(questionMatch ? questionMatch[0] : '', '')  // Remove questionMatch from content
        .replace(questionNumberMatch ? questionNumberMatch[0] : '', '') // Remove questionNumberMatch from content
        .trim();

      return (
        <>
          <BotMessage>
            <>
              {remainingContent &&
                <ServerSideMarkdown>{remainingContent}</ServerSideMarkdown>
              }
              {question && (
                <div className={`${remainingContent && `mt-2`} bg-transparent`}>
                  {question}
                </div>
              )}
              {questionNumberMatch && (
                <ServerSideSendTx question={Number(questionNumberMatch[1])} />
              )}
            </>
          </BotMessage>
        </>
      );
    },
    tools: {
      claim_reward: {
        description: "Start the blockchain transaction process",
        parameters: z.object({
          txData: z.object({
            walletAddress: z.string(),
            amount: z.number(),
          }),
        }),
        generate: async function* ({ txData }) {
          yield (
            <BotCard>
              <Loader2 className="h-5 w-5 animate-spin stroke-foreground" />
            </BotCard>
          );

          await sleep(1000); // Simulate delay

          try {
            history.done([
              ...history.get(),
              {
                role: 'assistant',
                name: 'create_transaction_session',
                content: `Started create transaction`,
              },
            ]);

            return (
              <BotMessage>
                You qualify for a reward of 0.1 ETH on Arbitrum Sepolia
                <ServerSideReward />
              </BotMessage>
            );

          } catch (error) {
            console.error('Error starting transaction session:', error);
            return (
              <BotMessage>
                Error starting transaction session. Please try again later.
              </BotMessage>
            );
          }
        }
      }
    },
    temperature: 0,
  });

  return {
    id: Date.now(),
    role: 'assistant' as const,
    display: reply.value,
  };
};

// Define the AI state and UI state types
export type AIState = Array<{
  id?: number;
  name?: 'create_transaction';
  role: 'user' | 'assistant' | 'system';
  content: string;
}>;

export type UIState = Array<{
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
  toolInvocations?: ToolInvocation[];
}>;

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});