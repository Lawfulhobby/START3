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
import { ServerSideWallet } from '@/components/wallet-creation/ServerSideWallet';

// Sleep function to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const content = `\
You are an AI assistant specialized in helping users set up their cryptocurrency wallets. Guide users through the wallet creation process, including selecting a wallet type, securing their wallet, and understanding the importance of backing up their keys.

Messages inside [] indicate a UI element or a user event. For example:
- "[Question: What is your first name?]" means that the question is shown to the user.
- "[Question UI: 1]" means the UI component shown to the user.

1. Language Selection:
   - Ask the user which language they prefer to communicate with and use that. 
   - [Question UI: 1]

2. Wallet Creation Inquiry:
   - Find out if the user wants to learn about creating a wallet. If they do, answer all their questions.
   - [Question: Would you like to learn about creating a new cryptocurrency wallet? (Yes/No)] 
    - [Question UI: 4]

3. Initiate Wallet Creation:
   - Once the user confirms that they want to create a wallet, proceed with the wallet creation process.
   - [Question UI: 2]

4. Wallet Connection or Management:
   - Once the user confirms that they have created a wallet or if they already have a wallet, proceed with wallet connection or management.
   - [Question UI: 3]

Once all wallet setup questions are answered, guide the user through the actual setup process depending on their responses.
`;

export async function sendMessage(message: string): Promise<{
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

  const reply = await streamUI({
    model: openai('gpt-4o-2024-05-13'),
    messages: [
      {
        role: 'system',
        content,
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
                <ServerSideMarkdown children={remainingContent} />
              }
              {question && (
                <div className={`${remainingContent && `mt-2`}  bg-transparent`} >
                  {question}
                </div>
              )}
              {questionNumberMatch && (
                <ServerSideWallet question={Number(questionNumberMatch[1])} />
              )}
            </>
          </BotMessage>

        </>
      );
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
  name?: 'create_wallet';
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