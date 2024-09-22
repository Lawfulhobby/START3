import type { UIState } from "@/app/wallet-creation/actions";
import { BotMessage } from "./llm/message";
import { MarkdownMessage } from "./markdown-message";

export function ChatList({ messages }: { messages: UIState[number][]; }) {
  // if (!messages.length) return null;

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <BotMessage>
        <MarkdownMessage children={
          `👋 **Hello there! I’m BlockBuddy,** your friendly guide to the exciting world of web3. Whether you’re here to create your first cryptocurrency wallet, dive into airdrops, or just learn more about blockchain, I’m here to help you every step of the way. 🌍

🚨 **Here’s a quick heads-up:**  
While I provide guidance and information, please remember that the blockchain space is always evolving. All information should be taken as educational, not financial advice. Ensure you do your own research and consult with professionals if necessary. 📚

🚀 **Ready to get started?** Follow along, ask questions whenever you need, and let’s make your journey into web3 as smooth and informative as possible!`
        } />
      </BotMessage>
      {messages.map((message, index) => (
        <div key={index} className="pb-4">
          {message.display}
        </div>
      ))}
    </div>
  );
}
