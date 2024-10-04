
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FiBookOpen } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa6";
import SignupButton from "@/components/wallet/SignupButton";
import LoginButton from "@/components/wallet/LoginButton";
import { useAccount } from 'wagmi';

interface BridgeLayoutProps {
    children?: React.ReactNode
}

export default function SideBarLayout({
    children,
}: BridgeLayoutProps) {
    const [open, setOpen] = useState(true);
    const { address } = useAccount();
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1  border border-neutral-200 dark:border-neutral-700",
                "h-screen w-full" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div>
                        <p className="text-black text-pretty text-7xl font-bold tracking-tighter text-gray-950">Transactions with Basenames</p>
                        <p className="text-black text-pretty text-xl font-medium tracking-tighter text-gray-950 mt-3">A basename is a human-readable name that can be registered for blockchain addresses. It serves as a foundational building block for on-chain identity, making it easier to identify and interact with addresses. </p>
                    </div>

                    {!address ? (
          <div
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
          >
            <LoginButton />
          </div>
    )
        : (

            <SignupButton />

        )}
                    
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            {/* <div className="h-6 w-6 bg-black dark:bg-white rounded-full flex-shrink-0" /> */}
            {/* <Icons.logo className="h-6 w-6 flex-shrink-0"/> */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={` text-black dark:text-white whitespace-pre`}
            >
                Bridge-In
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            {/* <div className="h-6 w-6 bg-black dark:bg-white rounded-full flex-shrink-0" /> */}
            {/* <Icons.logo className="h-6 w-6 flex-shrink-0"/> */}
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    {[...Array(4).keys()].map((i) => (
                        <div
                            key={i}
                            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...Array(2).keys()].map((i) => (
                        <div
                            key={i}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
