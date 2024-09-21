"use client";

import { BotMessage, ResponseSubmitted } from "@/components/llm/message";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/wallet-creation/actions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";

interface Option {
    name: string;
    description: string;
}

const settings: Option[] = [
    { name: 'Click once verification is complete', description: 'I have completed the verification process' },
];

export default function QuestionEight() {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { sendMessage } = useActions<typeof AI>();
    const [dis, setDis] = useState(false)

    const handleSelection = async (option: Option) => {
        const value = option.description;

        // Add user message UI
        setMessages((currentMessages: any) => [
            ...currentMessages,
            {
                id: Date.now(),
                role: "user",
                display: <ResponseSubmitted> Continue onboarding </ResponseSubmitted>,
            },
        ]);

        try {
            setDis(true)
            // Submit and get response message
            const responseMessage = await sendMessage(value);
            setMessages((currentMessages: any) => [
                ...currentMessages,
                responseMessage,
            ]);

        } catch (error) {
            console.error("Error submitting message:", error);
        }
    };

    return (
        <>
            <fieldset aria-label="Select an option">
                <div className="gap-4">
                    {settings.map((setting) => (
                        <Button
                            disabled={dis}
                            key={setting.name}
                            onClick={() => handleSelection(setting)}
                            className={cn(
                                'group bg-white items-center flex flex-col cursor-pointer  p-4 rounded-full shadow-none  hover:bg-gray-100'
                            )}
                        >
                            <div className="text-sm text-center">
                                <span className={cn('block font-medium text-gray-900')}>
                                    {setting.name}
                                </span>
                            </div>
                        </Button>
                    ))}
                </div>
            </fieldset>
        </>
    );
}