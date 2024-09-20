'use server';

import { BotCard, BotMessage } from '@/components/llm-crypto/message';
import { openai } from '@ai-sdk/openai';
import type { CoreMessage, ToolInvocation } from 'ai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { z } from 'zod';

// Sleep function to simulate delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const content = `\
You are an AI assistant specializing in helping users create and secure their first crypto wallet.\
Provide guidance on selecting wallet types, setting security options, and successfully backing up wallet keys.\
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

      return <BotMessage>{content}</BotMessage>;
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