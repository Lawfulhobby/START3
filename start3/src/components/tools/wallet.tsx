// app/create-wallet/page.tsx
"use client";

import { PlusGridItem } from "../plus-grid";
import { BackgroundGradient } from "../ui/background-gradient";
import LoginButton from "../wallet/LoginButton";
import SignupButton from "../wallet/SignupButton";
import { useAccount } from 'wagmi';

export default function WalletComponent() {
    const { address } = useAccount();
    return (
        <BackgroundGradient className="relative flex w-full p-4 sm:p-10 items-center justify-center rounded-[22px] bg-white dark:bg-zinc-900">
        {/* <BackgroundGradient className="flex bg-white items-center justify-center pt-10 rounded-lg pb-5 max-w-2xl w-full"> */}
            {!address ? (
                <PlusGridItem className="relative flex">
                    <div
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
                    >
                        <LoginButton />
                    </div>
                </PlusGridItem>)
                : (
                    <PlusGridItem className="relative flex">
                        <SignupButton />
                    </PlusGridItem>
                )}
        </BackgroundGradient>
    )
}
