// "use client";

// import { ChatList } from "@ai-rsc/components/chat-list";
// import { ChatScrollAnchor } from "@ai-rsc/components/chat-scroll-anchor";
// import { BotMessage, ResponseSubmitted, UserMessage } from "@ai-rsc/components/llm-onboarding/message";
// import { Button } from "@ai-rsc/components/ui/button";
// import { useActions, useUIState } from "ai/rsc";
// import { useState } from "react";
// import { AI } from "@ai-rsc/app/actions";
// import { cn } from "@ai-rsc/lib/utils";

// interface Option {
//     name: string;
//     description: string;
//     imageUrl: string; // Path to the PNG image
// }

// const settings: Option[] = [
//     { name: 'House', description: 'House', imageUrl: '/images/house.png' },
//     { name: 'Car', description: 'Car', imageUrl: '/images/car.png' },
//     { name: 'Business', description: 'Business', imageUrl: '/images/business.png' },
//     { name: 'Investment', description: 'Investment', imageUrl: '/images/investment.png' },
//     { name: 'None', description: 'None', imageUrl: '/images/none.png' },
// ];


// export default function QuestionThree() {
//     const [messages, setMessages] = useUIState<typeof AI>();
//     const { sendMessage } = useActions<typeof AI>();
//     const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
//     const [dis, setDis] = useState(false)

//     const handleToggle = (option: Option) => {
//         if (option.name === 'None') {
//             setSelectedOptions([option]); // Selecting "None" clears all other selections
//         } else {
//             setSelectedOptions((prevSelected) => {
//                 if (prevSelected.includes(option)) {
//                     return prevSelected.filter((selected) => selected !== option);
//                 } else {
//                     // If "None" is currently selected, remove it when selecting other options
//                     const filteredSelected = prevSelected.filter((selected) => selected.name !== 'None');
//                     return [...filteredSelected, option];
//                 }
//             });
//         }
//     };

//     const handleSubmit = async () => {
//         if (selectedOptions.length === 0) return; // Guard against submitting without selections
//         const values = selectedOptions.map(option => option.description).join(", ");
//         if (!values) return;

//         // Add user message UI
//         setMessages((currentMessages: any) => [
//             ...currentMessages,
//             {
//                 id: Date.now(),
//                 role: "user",
//                 display: <ResponseSubmitted> {values}</ResponseSubmitted>,
//             },
//         ]);

//         try {
//             setDis(true)
//             // Submit and get response message
//             const responseMessage = await sendMessage(values);
//             setMessages((currentMessages: any) => [
//                 ...currentMessages,
//                 responseMessage,
//             ]);

//         } catch (error) {
//             console.error("Error submitting message:", error);
//         }
//     };

//     return (
//         <>
//             <div className="mx-auto sm:px-4">
//                 <fieldset aria-label="Select options">
//                     <div className="grid grid-cols-3 gap-4">
//                         {settings.map((setting) => (
//                             <div
//                                 key={setting.name}
//                                 onClick={() => handleToggle(setting)}
//                                 className={cn(
//                                     'group items-center flex flex-col cursor-pointer border border-gray-200 p-4 rounded-md focus:outline-none',
//                                     selectedOptions.includes(setting) ? 'bg-green-50 border-green-200 z-10' : 'bg-white'
//                                 )}
//                             >
//                                 <div
//                                     aria-hidden="true"
//                                     className={cn(
//                                         'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
//                                         selectedOptions.includes(setting) ? 'border-transparent' : ''
//                                     )}
//                                 >
//                                     <img src={setting.imageUrl} alt={setting.name} className="h-full w-full object-contain" />
//                                 </div>
//                                 <div className="mt-2 text-center">
//                                     <span className={cn('block text-sm font-medium text-gray-900', selectedOptions.includes(setting) ? 'text-green-900' : '')}>
//                                         {setting.name}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </fieldset>

//                 <div className="mt-4 sm:right-4">
//                     <Button
//                         onClick={handleSubmit}
//                         variant={'secondary'}
//                         className="bg-gray-300"
//                         disabled={selectedOptions.length === 0 || dis} // Disable if no selections
//                     >
//                         <span>Submit</span>
//                     </Button>
//                 </div>
//             </div>
//         </>
//     );
// }

"use client";

import { ChatList } from "@ai-rsc/components/chat-list";
import { ChatScrollAnchor } from "@ai-rsc/components/chat-scroll-anchor";
import { BotMessage, ResponseSubmitted, UserMessage } from "@ai-rsc/components/llm-onboarding/message";
import { Button } from "@ai-rsc/components/ui/button";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { AI } from "@ai-rsc/app/actions";
import { cn } from "@ai-rsc/lib/utils";

interface Option {
    name: string;
    description: string;
    imageUrl: string; // Path to the PNG image
}

const settings: Option[] = [
    { name: 'House', description: 'House', imageUrl: '/images/house.png' },
    { name: 'Car', description: 'Car', imageUrl: '/images/car.png' },
    { name: 'Business', description: 'Business', imageUrl: '/images/business.png' },
    { name: 'Shares', description: 'Shares', imageUrl: '/images/investment.png' },
    { name: 'None', description: 'None', imageUrl: '/images/none.png' },
];

export default function QuestionThree() {
    const [messages, setMessages] = useUIState<typeof AI>();
    const { sendMessage } = useActions<typeof AI>();
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [dis, setDis] = useState(false); // Updated: `dis` state controls option disabling as well

    const handleToggle = (option: Option) => {
        if (dis) return; // Prevent toggling options if `dis` is true (i.e., after submission)
        
        if (option.name === 'None') {
            setSelectedOptions([option]); // Selecting "None" clears all other selections
        } else {
            setSelectedOptions((prevSelected) => {
                if (prevSelected.includes(option)) {
                    return prevSelected.filter((selected) => selected !== option);
                } else {
                    // If "None" is currently selected, remove it when selecting other options
                    const filteredSelected = prevSelected.filter((selected) => selected.name !== 'None');
                    return [...filteredSelected, option];
                }
            });
        }
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
            setDis(true); // Disable option selection after submission
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
                    <div className="grid grid-cols-3 gap-4">
                        {settings.map((setting) => (
                            <div
                                key={setting.name}
                                onClick={() => handleToggle(setting)}
                                className={cn(
                                    'group items-center flex flex-col cursor-pointer border border-gray-200 p-4 rounded-md focus:outline-none',
                                    selectedOptions.includes(setting) ? 'bg-green-50 border-green-200 z-10' : 'bg-white',
                                    dis ? 'cursor-not-allowed opacity-50' : '' // Add disabled styling when `dis` is true
                                )}
                            >
                                <div
                                    aria-hidden="true"
                                    className={cn(
                                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                                        selectedOptions.includes(setting) ? 'border-transparent' : ''
                                    )}
                                >
                                    <img src={setting.imageUrl} alt={setting.name} className="h-full w-full object-contain" />
                                </div>
                                <div className="mt-2 text-center">
                                    <span className={cn('block text-sm font-medium text-gray-900', selectedOptions.includes(setting) ? 'text-green-900' : '')}>
                                        {setting.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <div className="mt-4 sm:right-4">
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