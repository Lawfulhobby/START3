"use client";

import { BotMessage, ResponseSubmitted, UserMessage } from "@/components/llm/message";
import { Button } from "@/components/ui/button";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { AI } from "@/app/wallet-creation/actions";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    name: string;
    description: string;
}

const settings: Option[] = [
    { name: 'Save for retirement 👏', description: 'Save for retirement' },
    { name: 'Buy an asset 🪪', description: 'Buy an asset' },
    { name: 'Fund education 💵', description: 'Fund education' },
    { name: 'Create wealth 💸', description: 'Create wealth' },
    { name: 'Improve investment skills 👏', description: 'Improve investment skills' },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function QuestionOne() {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { sendMessage } = useActions<typeof AI>();
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]); // Updated to handle multiple selections
    const [dis, setDis] = useState(false);

    const handleToggle = (option: Option) => {
        if (dis) return; // Prevent toggling options if `dis` is true (i.e., after submission)
        
        setSelectedOptions((prevSelected) => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter((selected) => selected !== option);
            } else {
                return [...prevSelected, option];
            }
        });
    };

    const handleSubmit = async () => {
        if (selectedOptions.length === 0) return; // Guard against submitting without selections
        const values = selectedOptions.map(option => option.description).join(", ");
        if (!values) return;

        // Add user message UI
        setMessages((currentMessages: any) => [
            ...currentMessages,
            {
                id: Date.now(),
                role: "user",
                display: <ResponseSubmitted> {values}</ResponseSubmitted>,
            },
        ]);

        try {
            setDis(true); // Disable options after submission
            // Submit and get response message
            const responseMessage = await sendMessage(values);
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
                <fieldset aria-label="Select options">
                    <div className="-space-y-px rounded-md bg-white">
                        {settings.map((setting, settingIdx) => (
                            <div
                                key={setting.name}
                                onClick={() => handleToggle(setting)}
                                className={cn(
                                    settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                    settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                    'group items-center relative flex cursor-pointer border border-gray-200 p-4 focus:outline-none',
                                    selectedOptions.includes(setting) ? 'bg-green-50 border-green-200 z-10' : 'bg-white',
                                    dis ? 'cursor-not-allowed opacity-50' : '' // Disable styling if `dis` is true
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        'mt-0.5 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white',
                                        selectedOptions.includes(setting) ? 'border-transparent bg-green-500' : ''
                                    )}
                                >
                                    <span className="rounded-full ">
                                        {selectedOptions.includes(setting) ? (
                                            <CheckIcon className="text-sm h-3 w-3 text-white" />
                                        ) : (
                                            <MinusIcon className="text-sm h-3 w-3 text-black" />
                                        )}
                                    </span>
                                </span>
                                <span className="ml-3 flex flex-col">
                                    <span className={cn('block text-sm font-medium text-gray-900', selectedOptions.includes(setting) ? 'text-green-900' : '')}>
                                        {setting.name}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <div className="mt-2 sm:right-4">
                    <Button
                        onClick={handleSubmit}
                        variant={'secondary'}
                        className="bg-gray-300"
                        disabled={selectedOptions.length === 0 || dis} // Disable if no selections or already submitted
                    >
                        <span>Submit</span>
                    </Button>
                </div>
            </div>
        </>
    );
}