"use client";

import { ChatList } from "../chat-list";
import { ChatScrollAnchor } from "../chat-scroll-anchor";
import { BotMessage, ResponseSubmitted, UserMessage } from "@/components/llm/message";
import { Button } from "@/components/ui/button";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { RadioGroup } from '@headlessui/react';
import { AI } from "@/app/wallet-creation/actions";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    name: string;
    description: string;
}

const settings: Option[] = [
    { name: 'ID card', description: 'ID_CARD,' },
    { name: 'Passport ', description: 'PASSPORT' },
    { name: 'Driving License', description: 'DRIVERS_LICENSE' },
];

export default function QuestionSeven() {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { sendMessage } = useActions<typeof AI>();
    const [selected, setSelected] = useState<Option | null>(null);
    const [dis, setDis] = useState(false); // Added: state to disable the RadioGroup

    const handleSubmit = async () => {
        if (!selected) return; // Guard against submitting without a selection
        const value = selected.description;
        if (!value) return;

        // Add user message UI
        setMessages((currentMessages: any) => [
            ...currentMessages,
            {
                id: Date.now(),
                role: "user",
                display: <ResponseSubmitted> {selected.name}</ResponseSubmitted>,
            },
        ]);

        try {
            setDis(true); // Disable selection after submission
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
            <div className="mx-auto sm:px-4">
                <fieldset aria-label="Select an option">
                    <RadioGroup 
                        value={selected} 
                        onChange={setSelected} 
                        className="-space-y-px rounded-md bg-white"
                        disabled={dis} // Disable RadioGroup when `dis` is true
                    >
                        {settings.map((setting, settingIdx) => (
                            <RadioGroup.Option
                                key={setting.name}
                                value={setting}
                                className={({ checked }) =>
                                    cn(
                                        settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                        settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                        'group items-center relative flex cursor-pointer border border-gray-200 p-4 focus:outline-none',
                                        checked ? 'bg-green-50 border-green-200 z-10' : 'bg-white',
                                        dis ? 'cursor-not-allowed opacity-50' : '' // Add disabled styling when `dis` is true
                                    )
                                }
                            >
                                {({ checked }) => (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'mt-0.5 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white',
                                                checked ? 'border-transparent bg-green-600' : ''
                                            )}
                                        >
                                            <span className="rounded-full ">
                                                {checked ? <CheckIcon className="text-sm h-3 w-3 text-white" /> : <MinusIcon className="text-sm h-3 w-3 text-black" />}
                                            </span>
                                        </span>
                                        <span className="ml-3 flex flex-col">
                                            <span className={cn('block text-sm font-medium text-gray-900', checked ? 'text-green-900' : '')}>
                                                {setting.name}
                                            </span>
                                        </span>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                </fieldset>

                <div className="mt-2 sm:right-4">
                    <Button
                        onClick={handleSubmit}
                        variant={'secondary'}
                        className="bg-gray-300"
                        disabled={!selected || dis} // Disable button if no selection or already submitted
                    >
                        <span>Submit</span>
                    </Button>
                </div>
            </div>
        </>
    );
}