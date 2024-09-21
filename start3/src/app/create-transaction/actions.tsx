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
You are an AI assistant specialized in creating blockahin transactions.

Messages inside [] indicate a UI element or a user event. For example:
- "[Question: What is your first name?]" means that the question is shown to the user.
- "[Question UI: 1]" means the UI component shown to the user.

1. Language Selection:
   - Ask the user which language they prefer to communicate with and use that. 
   - [Question UI: 1]

2. The wallet address of receipient:
   - Find out the wallet address of the receipient
   - [Question UI: 4]

3. Amount being sent:
   -  Find out how much is going to be transfered.
   - [Question UI: 2]

Once all transaction questions are answered, call the \`create_transaction\` module
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
    // tools: {
    //   create_wallet: {
    //     description: "",
    //     // parameters: z.object({
    //     //   walletType: z.string().describe("Type of wallet to create."),
    //     //   secure: z.boolean().describe("Whether to apply high-security settings."),
    //     // }),
    //     generate: async function* ({ walletType, secure }: { walletType: string, secure: boolean; }) {
    //       yield (
    //         <BotMessage>
    //           Let's start by choosing a wallet type. You've selected: {walletType}.
    //         </BotMessage>
    //       );

    //       // Simulate wallet creation steps
    //       await sleep(1000);

    //       yield (
    //         <BotMessage>
    //           Next, we'll secure your wallet. Applying security measures: {secure ? "Enabled" : "Disabled"}.
    //         </BotMessage>
    //       );

    //       await sleep(1000);

    //       // Confirm wallet creation
    //       history.done([
    //         ...history.get(),
    //         {
    //           role: 'assistant',
    //           name: 'create_wallet',
    //           content: `[Wallet Created Successfully: Type ${walletType}, Security ${secure ? "High" : "Standard"}]`,
    //         },
    //       ]);

    //       return (
    //         <BotCard>
    //           <BotMessage>
    //             Your wallet has been created successfully. Type: {walletType}, Security: {secure ? "High" : "Standard"}.
    //           </BotMessage>
    //         </BotCard>
    //       );
    //     },
    //   },
    // },
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