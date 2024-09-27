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

// Simulated "database" content
const contentDatabase: Record<string, Content> = {
  ethCapeTown: {
    name: "EthCapeTown",
    description: "You are an AI assistant specialized in engaging users in promotional activities for EthCapeTown.",
    steps: [
      {
        step: 1,
        title: "Initial Engagement",
        content: "Ask the user if they have heard about EthCapeTown and what they know about the event.",
      },
      {
        step: 2,
        title: "Media Channel Follow-Up",
        content: `Ask the user if they have followed EthCapeTown's official media channels. Provide options like Yes/No.
                  If "No", provide the links to follow:
                    - [Link to Twitter](https://twitter.com/EthCapeTown)
                    - [Link to Instagram](https://instagram.com/EthCapeTown)
                  If "Yes", confirm which channels they have followed and record this information.`,
      },
      {
        step: 3,
        title: "Reward Eligibility",
        content: `If the user has followed the necessary channels, they qualify to receive a crypto reward.`,
      },
    ],
    rewardInstructions: "Once all questions are answered and the user is verified to have followed the required channels, call `claim_reward` with their wallet address to distribute the crypto reward."
  },
  web3Expo: {
    name: "Web3 Expo",
    description: "You are an AI assistant specialized in engaging users in promotional activities for Web3 Expo.",
    steps: [
      {
        step: 1,
        title: "Introduction",
        content: "Ask the user if they have heard about Web3 Expo and if they are planning to attend.",
      },
      {
        step: 2,
        title: "Social Media Follow-Up",
        content: `Ask the user if they are following Web3 Expo's official social media channels. Provide options like Yes/No.
                  If "No", provide the links to follow:
                    - [Link to Twitter](https://twitter.com/Web3Expo)
                    - [Link to Instagram](https://instagram.com/Web3Expo)
                  If "Yes", confirm which channels they are following.`,
      },
      {
        step: 3,
        title: "Expo Registration",
        content: `Remind the user that they need to register for the event to secure their spot.`,
      },
    ],
    rewardInstructions: "Once registered, confirm their registration and offer event updates."
  }
};

// Async function to simulate fetching content based on `id` from a "database"
export async function fetchContentFromDb(id: string): Promise<Content> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const content = contentDatabase[id];
      if (content) {
        resolve(content);
      } else {
        reject(`Content with id '${id}' not found`);
      }
    }, 1000); // Simulated delay of 1 second
  });
}

// Function to get the content based on the provided `id`
export async function getContent(id: string): Promise<string> {
  try {
    const content = await fetchContentFromDb(id);
    
    const formattedContent = `\
    ${content.description}
    
    Messages inside [] indicate a UI element or a user event. For example:
    - "[Question: What is your first name?]" means that the question is shown to the user.
    
    ${content.steps.map(step => `
    ${step.step}. ${step.title}:
      - ${step.content}
    `).join('\n')}
    
    ${content.rewardInstructions}
    `;
    
    return formattedContent;
  } catch (error) {
    return `Error: ${error}`;
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