
"use client"
import { ChatList } from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { UserMessage } from "@/components/llm/message";
import { Button } from "@headlessui/react";
import type { ChatInputs } from "@/lib/chat-schema";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { useForm } from "@/lib/use-form";
import { useActions, useUIState } from "ai/rsc";
import { ArrowDownIcon, ArrowRight, PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import type { AI } from "./actions";
import { GradientBackground } from "@/components/gradient";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useAccount } from 'wagmi';
import LoginButton from "@/components/wallet/LoginButton";
import SignupButton from "@/components/wallet/SignupButton";
import useSWR from "swr";
import { PathFinderLoader } from "@/components/loader";

type Props = {
  params: {
    slug: string[];
  };
};

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


// Define the fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ params: { slug } }: Props) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { address } = useAccount();

  const form = useForm<ChatInputs>();

  const [id] = slug;
  const { data, error } = useSWR(`/api/GET/getInfo/${id}`, fetcher);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (
          e.target &&
          ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);

  const submitHandler: SubmitHandler<ChatInputs> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    // Add user message UI
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      // Submit and get response message, passing the dynamic `id`
      const responseMessage = await sendMessage(value, id); // Pass `id` here
      setMessages(currentMessages => [
        ...currentMessages,
        responseMessage,
      ]);
    } catch (error) {
      // You may want to show a toast or trigger an error state.
      console.error(error);
    }

  };

  // Function to format the content into a structured format
  function getContent(content: Content) {
    if (!content) {
      throw new Error(`Content with id '${id}' not found`);
    }

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
  }

  if (error) return <div>An error occurred.</div>;
  if (!data) return (
    <PathFinderLoader />
  );

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={30}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4">
            <p className="text-black text-pretty text-7xl font-bold tracking-tighter text-gray-900">{data.session.name}</p>
            <p className="text-black text-pretty text-lg font-medium tracking-tighter text-gray-700 mt-3">{data.session.description}</p>
          </div>
          {JSON.stringify(getContent(data.session))}



          {!address ? (
            <div
              className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
            >
              <LoginButton />
            </div>
          )
            : (<SignupButton />)}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={32} minSize={30}>
          <GradientBackground />

          <div className="flex flex-col h-full">
            {/* Chat list and messages */}
            <div className="flex-grow overflow-auto pt-20 pb-20">
              <ChatList messages={messages} />
              <ChatScrollAnchor trackVisibility={true} />
            </div>

            {/* Message input at the bottom */}
            <div className="relative mx-auto max-w-2xl px-4 w-full backdrop-blur-sm bg-white bg-opacity-10">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="group relative flex flex-col items-start">
                  <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(submitHandler)}
                    className="w-full flex items-center"
                  >
                    <TextareaAutosize
                      tabIndex={0}
                      onKeyDown={onKeyDown}
                      placeholder="Send a message."
                      className="min-h-[60px]  w-full pr-24 resize-none focus:outline-none rounded p-2 text-lg font-medium tracking-tighter text-gray-950 dark:text-white sm:text-xl"
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                      autoCorrect="off"
                      rows={1}
                      {...form.register("message")}
                    />
                    <div className="absolute right-0 top-4 sm:right-4">
                      {form.watch("message") !== "" && (
                        <Button
                          type="submit"
                          disabled={form.watch("message") === ""}
                          className="rounded-full bg-[#A479FF] py-1 px-3"
                        >
                          send
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}