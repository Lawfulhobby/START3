// 'use server';

// import { BotCard, BotMessage } from '@ai-rsc/components/llm-grocery/message';
// import { Price } from '@ai-rsc/components/llm-grocery/price';
// import { PriceSkeleton } from '@ai-rsc/components/llm-grocery/price-skeleton';
// import { ProductFacts } from '@ai-rsc/components/llm-grocery/product-facts';
// import { ProductFactsSkeleton } from '@ai-rsc/components/llm-grocery/product-facts-skeleton';
// import { openai } from '@ai-sdk/openai';
// import type { CoreMessage, ToolInvocation } from 'ai';
// import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
// import { Loader2 } from 'lucide-react';
// import type { ReactNode } from 'react';
// import { z } from 'zod';

// // Sleep function to simulate delay
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// /* 
//   !-- The assistant is designed to help users with grocery shopping by retrieving product prices and facts.
//   !-- It uses the Open Food Facts API to provide detailed information about various products.
//   !-- The assistant can also chat with users for a more interactive experience.

//   !-- The AI model can call functions based on user queries. If the query is related to product prices or facts,
//   !-- it will call the relevant function. If the request is outside the available options, it will respond accordingly.
// */

// const content = `\
// You are a grocery shopping assistant. You can help users get the prices of grocery items and provide facts about products.

// Messages inside [] indicate a UI element or a user event. For example:
// - "[Price of Apple = $1.20]" means that the price of an apple is shown to the user.
// - "[Facts about Apple]" means that product information about the apple is displayed to the user.

// If the user wants the price of a product, call \`get_product_price\` to show the price.
// If the user wants facts about a product, call \`get_product_facts\` to show the information.
// If the user asks for something unrelated, respond that you are a demo and cannot do that.

// Besides providing prices and facts, you can also chat with users.
// `;

// export async function sendMessage(message: string): Promise<{
//   id: number;
//   role: 'user' | 'assistant';
//   display: ReactNode;
// }> {

//   const history = getMutableAIState<typeof AI>();

//   history.update([
//     ...history.get(),
//     {
//       role: 'user',
//       content: message,
//     },
//   ]);

//   const reply = await streamUI({
//     model: openai('gpt-4o-2024-05-13'),
//     messages: [
//       {
//         role: 'system',
//         content,
//         toolInvocations: [],
//       },
//       ...history.get(),
//     ] as CoreMessage[],
//     initial: (
//       <BotMessage className="items-center flex shrink-0 select-none justify-center">
//         <Loader2 className="h-5 w-5 animate-spin stroke-zinc-900" />
//       </BotMessage>
//     ),
//     text: ({ content, done }) => {
//       if (done) history.done([...history.get(), { role: 'assistant', content }]);

//       return <BotMessage>{content}</BotMessage>;
//     },
//     tools: {
//       get_product_price: {
//         description: "Get the current price of a given grocery product. Use this to show the price to the user.",
//         parameters: z.object({
//           storeName: z.string().describe("The name of the supermarket. e.g. checkers/shoprite/pnp/balmoral."),
//           productName: z.string().describe("The name of the product. e.g. Apple/Banana/Bread.")
//         }),
//         generate: async function* ({ storeName, productName }: { storeName: string, productName: string; }) {
//           yield (
//             <BotCard>
//               <PriceSkeleton />
//             </BotCard>
//           );

//           // Fetch price from the API server
//           try {
//             const response = await fetch(`http://localhost:8000/${storeName}/${productName}`);
            
//             if (!response.ok) {
//               throw new Error('Failed to fetch product price.');
//             }

//             const products = await response.json();

//             if (products.length === 0) {
//               return <BotMessage>No products found!</BotMessage>;
//             }

//             const product = products[0]; // Assuming the first product is the one we want

//             const price = parseFloat(product.price.replace(/[^\d.]/g, '')); // Remove any non-numeric characters
//             const image = product.img || 'https://via.placeholder.com/100'; // Use a placeholder if image is not available
//             const delta = 0; // Assuming delta as a placeholder value for now

//             await sleep(1000);

//             history.done([
//               ...history.get(),
//               {
//                 role: 'assistant',
//                 name: 'get_product_price',
//                 content: `[Price of ${productName} at ${storeName} = ${product.price}]`,
//               },
//             ]);

//             return (
//               <BotCard>
//                 <Price name={productName} price={price} image={image} delta={delta} supermarket={storeName} />
//               </BotCard>
//             );
//           } catch (error) {
//             console.error(error);
//             return <BotMessage>Error fetching product price!</BotMessage>;
//           }
//         },
//       },
//       get_product_facts: {
//         description: "Get facts about a given grocery product. Use this to show the product facts to the user.",
//         parameters: z.object({
//           productCode: z.string().describe("The barcode or identifier of the product.")
//         }),
//         generate: async function* ({ productCode }: { productCode: string; }) {
//           yield (
//             <BotCard>
//               <ProductFactsSkeleton />
//             </BotCard>
//           );

//           // Fetch product facts from the Open Food Facts API
//           const url = `https://world.openfoodfacts.org/api/v0/product/${productCode}.json`;

//           try {
//             const response = await fetch(url, {
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               }
//             });

//             if (!response.ok) {
//               return <BotMessage>Product not found!</BotMessage>;
//             }

//             const res = await response.json();

//             if (!res.product) {
//               return <BotMessage>Product not found!</BotMessage>;
//             }

//             const product = res.product;
//             const facts = {
//               name: product.product_name || "Unknown Product",
//               brand: product.brands || "Unknown Brand",
//               categories: product.categories || "Unknown Categories",
//               ingredients: product.ingredients_text || "No ingredients listed",
//               nutriscore: product.nutriscore_grade || "Not available",
//             };

//             await sleep(1000);

//             history.done([
//               ...history.get(),
//               {
//                 role: 'assistant',
//                 name: 'get_product_facts',
//                 content: `[Facts about ${facts.name}]`,
//               },
//             ]);

//             return (
//               <BotCard>
//                 <ProductFacts {...facts} />
//               </BotCard>
//             );
//           } catch (error) {
//             console.error(error);
//             return <BotMessage>Error fetching product facts!</BotMessage>;
//           }
//         },
//       }
//     },
//     temperature: 0,
//   });

//   return {
//     id: Date.now(),
//     role: 'assistant' as const,
//     display: reply.value,
//   };
// };

// // Define the AI state and UI state types
// export type AIState = Array<{
//   id?: number;
//   name?: 'get_product_price' | 'get_product_facts';
//   role: 'user' | 'assistant' | 'system';
//   content: string;
// }>;

// export type UIState = Array<{
//   id: number;
//   role: 'user' | 'assistant';
//   display: ReactNode;
//   toolInvocations?: ToolInvocation[];
// }>;

// // Create the AI provider with the initial states and allowed actions
// export const AI = createAI({
//   initialAIState: [] as AIState,
//   initialUIState: [] as UIState,
//   actions: {
//     sendMessage,
//   },
// });

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
You are an AI assistant. You can help users with blockchain transactions by processing transaction details like amount, recipient name, and token name.

Messages inside [] indicate a UI element or a user event. For example:
- "[Transaction Processed]" means the transaction details have been processed and displayed to the user.
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
      process_transaction: {
        description: "Process a blockchain transaction with amount, recipient name, and token name.",
        parameters: z.object({
          amount: z.number().describe("The amount of tokens to be transferred."),
          recipientName: z.string().describe("The name of the recipient."),
          tokenName: z.string().describe("The name of the token being transferred."),
        }),
        generate: async function* ({ amount, recipientName, tokenName }: { amount: number, recipientName: string, tokenName: string; }) {
          yield (
            <BotMessage>
              Processing transaction of {amount} {tokenName} to {recipientName}...
            </BotMessage>
          );

          // Simulate transaction processing
          await sleep(1000);

          history.done([
            ...history.get(),
            {
              role: 'assistant',
              name: 'process_transaction',
              content: `[Transaction Processed: Sent ${amount} ${tokenName} to ${recipientName}]`,
            },
          ]);

          return (
            <BotCard>
              <BotMessage>
                Transaction successful: {amount} {tokenName} sent to {recipientName}.
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
  name?: 'process_transaction';
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