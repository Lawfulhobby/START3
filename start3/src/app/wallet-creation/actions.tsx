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

// Sleep function to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// You only use Afrikaans to speak to the user

const content = `\
You are an AI assistant specialized in helping users set up their cryptocurrency wallets. Guide users through the wallet creation process, including selecting a wallet type, securing their wallet, and understanding the importance of backing up their keys.

Messages inside [] indicate a UI element or a user event. For example:
- "[Question: What type of wallet would you like to create?]" means that the question is shown to the user.
- "[Security Level: high, medium, low]" prompts the user to choose their preferred security level.

Ask the user which language they prefer to communicate with and use that.

Interactive Wallet Setup: Ask the following questions one by one:
1. What type of wallet are you interested in? (e.g., software, hardware) [Question UI: 1]
2. What level of security are you looking for? [Security Level: high, medium, low]
3. Do you understand the importance of backing up your wallet? [Question UI: 2]
4. Would you like to enable multi-factor authentication? [Question UI: 3]
5. Do you need guidance on how to back up your wallet securely? [Question UI: 4]

Once all wallet setup questions are answered, guide the user through the actual setup process depending on their responses.

Verification Stage: Confirm the user's choices and provide them with a summary of their selections.
- Once confirmed, assist them in setting up the wallet according to the specifications they chose.

Final Steps: Ask the user to review all security settings and backup options.
- Encourage them to perform a test transaction to ensure everything is working as expected.
- Provide resources or links for further learning about wallet security and best practices.

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

      return <BotMessage>
        <>
        <ServerSideMarkdown children={content} />
        </>

        </BotMessage>;
    },
    tools: {
      create_wallet: {
        description: "Guide the user through the steps of creating a new wallet, including selecting a wallet type and securing it.",
        parameters: z.object({
          walletType: z.string().describe("Type of wallet to create."),
          secure: z.boolean().describe("Whether to apply high-security settings."),
        }),
        generate: async function* ({ walletType, secure }: { walletType: string, secure: boolean; }) {
          yield (
            <BotMessage>
              Let's start by choosing a wallet type. You've selected: {walletType}.
            </BotMessage>
          );

          // Simulate wallet creation steps
          await sleep(1000);

          yield (
            <BotMessage>
              Next, we'll secure your wallet. Applying security measures: {secure ? "Enabled" : "Disabled"}.
            </BotMessage>
          );

          await sleep(1000);

          // Confirm wallet creation
          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'create_wallet',
              content: `[Wallet Created Successfully: Type ${walletType}, Security ${secure ? "High" : "Standard"}]`,
            },
          ]);

          return (
            <BotCard>
              <BotMessage>
                Your wallet has been created successfully. Type: {walletType}, Security: {secure ? "High" : "Standard"}.
              </BotMessage>
            </BotCard>
          );
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