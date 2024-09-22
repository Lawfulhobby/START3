// @ts-nocheck
import React from "react";
import { FiBookOpen, FiEye, FiWatch } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { useAccount } from "wagmi"; // Import useAccount

export const GridCards = () => {
    const { isConnected } = useAccount(); // Get connection status

    return (
        <div className="bg-background p-4 text-foreground md:p-12">
            <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
                <TitleCard />
                <Card
                    href="/wallet-creation"
                    title="Incentivized marketing"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Guide users through the process of creating and securing their first crypto wallet using interactive AI assistance."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="/create-transaction"
                    title="Send Transactions"
                    readTime="Live"
                    src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Experience personalized learning paths that adjust content based on your responses to enhance your understanding of web3."
                    disabled={!isConnected} // Pass disabled prop
                />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border-x border-b border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
                <Card
                    href="#"
                    title="Airdrop Eligibility Screener"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Discover airdrops you qualify for through an AI-driven questionnaire that matches you with suitable opportunities."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="Personalized Onboarding Paths"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Engage with custom-tailored onboarding journeys based on your interests in the web3 ecosystem, guided by AI."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="Virtual Web3 Assistant"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Get real-time assistance and answers to your web3 questions from our AI-powered virtual assistant."
                    disabled={!isConnected} // Pass disabled prop
                />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border-x border-b border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
                <Card
                    href="#"
                    title="Simulated Smart Contract Interactions"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Practice safe and risk-free transactions with simulated smart contract interactions to build your confidence in handling real assets."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="Feedback and Improvement AI"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Enhance your learning experience with AI that analyzes your feedback to continuously improve the onboarding process."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="AI-Guided Web3 Exploration"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Navigate the complexities of the web3 world with guided tours and explorations designed by our advanced AI system."
                    disabled={!isConnected} // Pass disabled prop
                />
            </div>
        </div>
    );
};

const Card = ({
    href,
    title,
    readTime,
    src,
    disabled, // Accept disabled prop
}: {
    href: string;
    title: string;
    readTime: string;
    src: string;
    disabled?: boolean; // Define disabled as optional
}) => {
    return (
        <a
            href={disabled ? "#" : href} // Prevent navigation if disabled
            target="_blank"
            className={`group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors md:h-80 md:p-9 
                ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none " : "hover:bg-neutral-950"}`}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault(); // Prevent navigation if disabled
                }
            }}
        >
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-primary transition-colors duration-500 group-hover:text-neutral-50">
                <span>{readTime}</span>
            </div>
            <h2 className="relative  z-10 text-3xl text-primary group-hover:text-neutral-50 leading-tight transition-transform duration-500 group-hover:-translate-y-3">
                {title}
            </h2>

            <FiEye className="absolute right-3 top-4 z-10 text-2xl text-primary transition-colors group-hover:text-neutral-50" />

            <div
                className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Corners />
        </a>
    );
};

const Corners = () => (
    <>
        <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-accent transition-all duration-500 group-hover:scale-100" />
    </>
);

const TitleCard = () => {
    return (
        <a
            href="/wallet-creation"
            // target="_blank"
            className="group relative flex h-56 flex-col justify-between bg-neutral-950 p-6 md:h-80 md:p-9"
        >
            <h2 className="text-4xl uppercase leading-tight">
                <span className="text-neutral-400 transition-colors duration-500 group-hover:text-emerald-300">
                    Interactive
                </span>
                <br />
                Wallet Setup
            </h2>
            {/* <div className="flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
                <FiBookOpen className="text-base" />
                <span>your.beehiiv.com</span>
            </div> */}

            <FiArrowUpRight className="absolute right-3 top-4 text-2xl text-neutral-400 transition-colors duration-500 group-hover:text-emerald-300" />
        </a>
    );
};