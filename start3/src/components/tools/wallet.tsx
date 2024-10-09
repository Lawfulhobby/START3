// app/create-wallet/page.tsx
"use client";

import { PlusGridItem } from "../plus-grid";
import LoginButton from "../wallet/LoginButton";
import SignupButton from "../wallet/SignupButton";
import { useAccount } from 'wagmi';

export default function WalletComponent() {
    const { address } = useAccount();
    return (
        <div className="bg-neutral-800 pt-10 rounded-lg pb-5 max-w-2xl w-full">
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
        </div>
    )
}
