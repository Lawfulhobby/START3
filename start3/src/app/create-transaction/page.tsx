// @ts-nocheck
"use client";

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

export default function Home() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<ChatInputs>();

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
      // Submit and get response message
      const responseMessage = await sendMessage(value);
      setMessages(currentMessages => [
        ...currentMessages,
        responseMessage,
      ]);
    } catch (error) {
      // You may want to show a toast or trigger an error state.
      console.error(error);
    }

  };

  return (
    <main className="bg-background min-h-screen flex-1">
      <GradientBackground />
      <div className="pb-[200px] pt-20 md:pt-20">
        <ChatList messages={messages} />
        <ChatScrollAnchor trackVisibility={true} />
      </div>

      <div className="fixed bottom-0 z-50 px-4 pb-10 pt-5 backdrop-blur-sm bg-white bg-opacity-10 w-full">
        <div className="mx-auto px-4 lg:px-8 flex justify-center items-center h-full">
          <div className="md:pl-[200px] md:px-[300px] lg:pl-[330px] lg:px-[900px] w-full ">
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(submitHandler)}

            >
              <div className="relative flex flex-col items-center w-full">
                <TextareaAutosize
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] bg-transparent w-full pr-24 resize-none focus:outline-none rounded p-2 text-lg font-medium tracking-tighter text-gray-950 dark:text-white sm:text-xl"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  {...form.register('message')}
                />
                <div className="absolute right-0 top-4 sm:right-4">
                  {form.watch('message') !== '' &&
                    <Button
                      type="submit"
                      disabled={form.watch('message') === ''}
                      className="rounded-full bg-[#A479FF] py-1 px-3"
                    >
                      send
                    </Button>
                  }
                </div>
              </div>
            </form>


          </div>
        </div>
      </div>

    </main>
  );
}
