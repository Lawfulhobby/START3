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
import { ServerSideTx } from '@/components/create-transaction/ServerSideTx';
import { ServerSideSendTx } from '@/components/create-transaction/ServerSideSendTx';

// Sleep function to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const content = `\
You are an AI assistant specialized in creating blockahin transactions.

Info: Basenames allows users to register human-readable names for their addresses and serves as a foundational building block for onchain identity. Should be this format name.base.eth 

Messages inside [] indicate a UI element or a user event. For example:
- "[Question: What is your first name?]" means that the question is shown to the user.
- "[Question UI: 1]" means the UI component shown to the user.

1. Language Selection:
   - Ask the user which language they prefer to communicate with and use that. 
   - [Question UI: 3]

2. The basename of receipient:
   - Find out the basename of the receipient
   - [Question UI: 7]

3. Amount being sent:
   -  Find out how much is going to be transfered.
   - [Question UI: 2]

Once all transaction questions are answered, call \`create_transaction_session\` 
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
                <div className={`${remainingContent && `mt-2`} text-black bg-transparent`} >
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
      create_transaction_session: {
        description: "Start the blockchain transaction process",
        parameters: z.object({
          txData: z.object({
            basename: z.string(),
            amount: z.number(),
          }),
        }),

        generate: async function* ({ txData }) {
          yield (
            <BotCard>
              <Loader2 className="h-5 w-5 animate-spin stroke-foreground" />
            </BotCard>
          );

          // Simulate delay
          await sleep(1000);

          try {
            // Update the history with the received data
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
               <p className='text-black'>Confirm your transaction of {txData.amount}</p> 
                <ServerSideTx
                 basename={txData.basename}
                  amount={txData.amount}
                />
              </BotMessage>
            );

          } catch (error) {
            console.error('Error retrieving portfolio:', error);
            return (
              <BotMessage>
                Error starting transaction session. Please try again later.
              </BotMessage>
            );
          }
        },

      },
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