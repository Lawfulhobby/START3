import type { UIState } from "@/app/wallet-creation/actions";
import { BotMessage } from "./llm/message";
import { MarkdownMessage } from "./markdown-message";

export function ChatList({ messages }: { messages: UIState[number][]; }) {
  // if (!messages.length) return null;

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <BotMessage>
        <MarkdownMessage>
          {`#  Hello there! I’m BlockBuddy

Your friendly guide to the exciting world of web3. Whether you’re here to create your first cryptocurrency wallet, dive into airdrops, or just learn more about blockchain, I’m here to help you every step of the way. 🌍


`}
        </MarkdownMessage>
      </BotMessage>
      {messages.map((message, index) => (
        <div key={index} className="pb-4">
          {message.display}
        </div>
      ))}
    </div>
  );
}
