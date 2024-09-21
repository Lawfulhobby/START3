"use client";

import { BotMessage, ResponseSubmitted, UserMessage } from "@/components/llm/message";
import { Button } from "@/components/ui/button";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { AI } from "@/app/wallet-creation/actions";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

export default function QuestionTwo() {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { sendMessage } = useActions<typeof AI>();
    const [size, setSize] = useState("0")
    const [dis, setDis] = useState(false);

    const handleSubmit = async () => {
        const value = `R${size}`;
        if (!value) return;

        // Add user message UI
        setMessages((currentMessages: any) => [
            ...currentMessages,
            {
                id: Date.now(),
                role: "user",
                display: <ResponseSubmitted> {value}</ResponseSubmitted>,
            },
        ]);

        try {
            setDis(true);
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
                <p className="text-sm text-gray-500 mb-5">R{size}</p>
                <Slider
                    onValueChange={(value) => setSize(value[0].toString())}
                    defaultValue={[Number(size)]}
                    max={1000000}  // Number(balances['PZAR'])
                    step={1}
                    className={cn("w-[100%] rounded-full")}
                    disabled={dis}
                />
                <div className="mt-4 sm:right-4">
                    <Button
                        onClick={handleSubmit}
                        variant={'secondary'}
                        className="bg-gray-300 rounded-full"
                        disabled={size === "0" || dis}
                    >
                        <span>Submit</span>
                    </Button>
                </div>
            </div>
        </>
    );
}