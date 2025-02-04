import { Dispatch, SetStateAction, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import SwapComponent from "./swap";
import LanguageOptions from "../wallet-creation/language_options";
import NumberTool from "./number";
import LanguageComponent from "./language";
import { TransactComponent } from "./transact";
import WalletComponent from "./wallet";
import TextComponent from "./text";
import BasenameComponent from "./basename";
import TwitterComponent from "./twitter";
import InstagramComponent from "./instagram";
import LinkedInComponent from "./LinkedIn";

const ToolGallery = () => {
    const [open, setOpen] = useState(tools[0].id); // Keep track of selected tool ID
    const selectedTool = tools.find((s) => s.id === open)?.tool; // Get the selected tool component

    return (
        <section className=" bg-white">
            <div className="w-full items-center max-w-7xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2">
                <div className="w-5xl flex">
                    {/* <h3 className="text-4xl text-black font-bold mb-8">Tools</h3> */}
                    <div className="flex flex-col gap-4">
                        {tools.map((q) => (
                            <Solution {...q} key={q.id} open={open} setOpen={setOpen} index={q.id} />
                        ))}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={open}
                    >
                        {selectedTool} {/* Render the selected tool component here */}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

const Solution = ({
    title,
    description,
    index,
    open,
    setOpen,
}: {
    title: string;
    description: string;
    index: number;
    open: number;
    setOpen: Dispatch<SetStateAction<number>>;
}) => {
    const isOpen = index === open;

    return (
        <div
            onClick={() => setOpen(index)}
            className="p-0.5 rounded-lg relative overflow-hidden cursor-pointer"
        >
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "170px" : "45px",
                }}
                className="py-2 px-4 rounded-[7px] bg-white flex flex-col justify-between relative z-20"
            >
                <div>
                    <motion.p
                        initial={false}
                        animate={{
                            color: isOpen ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
                        }}
                        className="text-xl font-display text-balance tracking-tight font-medium w-fit bg-gradient-to-r from-violet-600 to-[#A479FF] bg-clip-text"
                    >
                        {title}
                    </motion.p>
                    <motion.p
                        initial={false}
                        animate={{
                            opacity: isOpen ? 1 : 0,
                        }}
                        className="mt-4 font-display text-balance tracking-tight bg-gradient-to-r from-violet-600 to-[#A479FF] bg-clip-text text-transparent"
                    >
                        {description}
                    </motion.p>
                </div>
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                }}
                className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-[#A479FF]"
            />
            <div className="absolute inset-0 z-0 bg-slate-200" />
        </div>
    );
};

export default ToolGallery;

const tools = [
    {
        id: 1,
        title: "Text",
        description:
            "Add informative or instructional text to your onboarding flow. Use this component to guide users, provide context, or explain key concepts in a clear and concise manner.",
        tool: <TextComponent />,
    },
    {
        id: 2,
        title: "Number",
        description:
            "Collect numerical input from users. Ideal for gathering data such as age, investment amounts, or any other quantitative information necessary for customizing the onboarding experience.",
        tool: <NumberTool />,
    },
    {
        id: 3,
        title: "Language",
        description:
            "Enable multi-language support by allowing users to select their preferred language. This ensures that the onboarding flow is accessible and understandable to a diverse user base.",
        tool: <LanguageComponent/>,
    },
    {
        id: 4,
        title: "Connect Wallet",
        description:
            "Integrate wallet connection functionality, enabling users to securely link their cryptocurrency wallets. This is essential for transactions, staking, and interacting with decentralized applications (dApps) within the onboarding flow.",
        tool: <WalletComponent />,
    },
    {
        id: 5,
        title: "Transact",
        description:
            "Facilitate transactions directly within the onboarding flow. This component allows users to send, receive, or swap cryptocurrencies, providing a hands-on experience with blockchain transactions.",
        tool: <TransactComponent />,
    },
    {
        id: 6,
        title: "Swap",
        description:
            "Enable token swapping within the onboarding flow. Users can exchange one cryptocurrency for another, helping them understand liquidity pools and decentralized exchanges (DEXs) as part of their Web3 journey.",
        tool: <SwapComponent />,
    },
    {
        id: 7,
        title: "Basename",
        description:
            "Enable token swapping within the onboarding flow. Users can exchange one cryptocurrency for another, helping them understand liquidity pools and decentralized exchanges (DEXs) as part of their Web3 journey.",
        tool: <BasenameComponent />,
    },
    {
        id: 8,
        title: "Twitter Embed",
        description:
            "Embed a Twitter post directly into the flow to allow users to showcase their tweets or follow discussions. This can be used for sharing progress, updates, or engaging with the Web3 community on Twitter.",
        tool: <TwitterComponent />,
    },
    {
        id: 9, 
        title: "Instagram Embed",
        description:
            "Embed an Instagram post or feed, enabling users to showcase visual content or campaigns related to their Web3 journey. This is great for highlighting achievements, events, or social media participation.",
        tool: <InstagramComponent/>
    },
    {
        id: 10,
        title: "LinkedIn Embed",
        description:
            "Embed a LinkedIn post or profile to help users connect professionally or share milestones in the Web3 space. Perfect for highlighting career advancements, partnerships, or thought leadership in the blockchain ecosystem.",
        tool: <LinkedInComponent/>
    },
];
