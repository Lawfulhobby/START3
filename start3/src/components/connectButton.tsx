// "use client";

// import { useEffect, useRef } from "react";
// import {
//     useConnectModal,
//     useAccountModal,
//     useChainModal,
// } from "@rainbow-me/rainbowkit";
// import { useAccount, useDisconnect } from "wagmi";
// import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
// import { Button } from "./ui/button";

// export const ConnectBtn = () => {
//     const { isConnecting, address, isConnected, chain } = useAccount();
//     const { color: backgroundColor, emoji } = emojiAvatarForAddress(
//         address ?? ""
//     );

//     const { openConnectModal } = useConnectModal();
//     const { openAccountModal } = useAccountModal();
//     const { openChainModal } = useChainModal();
//     const { disconnect } = useDisconnect();

//     const isMounted = useRef(false);

//     useEffect(() => {
//         isMounted.current = true;
//     }, []);

//     if (!isConnected) {
//         return (
//             <div className="flex justify-center">
//                 <button
//                  className="flex justify-center items-center px-4 py-3 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
//                     onClick={async () => {
//                         // Disconnecting wallet first because sometimes when is connected but the user is not connected
//                         if (isConnected) {
//                             disconnect();
//                         }
//                         openConnectModal?.();
//                     }}
//                     disabled={isConnecting}
//                 >
//                     {isConnecting ? "Connecting..." : "Connect your wallet"}
//                 </button>
//             </div>
//         );
//     }

//     if (isConnected && !chain) {
//         return (
//             <div className="flex justify-center">
//                 <button className="btn" onClick={openChainModal}>
//                     Wrong network
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-5xl w-full flex items-center justify-center space-x-4">
//             <div
//                 className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
//                 onClick={async () => openAccountModal?.()}
//             >
//                 <div
//                     role="button"
//                     tabIndex={1}
//                     className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
//                     style={{
//                         backgroundColor,
//                         boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
//                     }}
//                 >
//                     {emoji}
//                 </div>
//                 <p>Account</p>
//             </div>
//             <button
//                 className="flex justify-center items-center px-4 py-3 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
//                 onClick={openChainModal}>
//                 Switch Networks
//             </button>
//         </div>
//     );
// };
"use client"
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

export const ConnectBtn = () => {
    return (
        <Wallet>
            <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
            </ConnectWallet>
            <WalletDropdown>
                <Identity
                    className="px-4 pt-3 pb-2"
                    hasCopyAddressOnClick
                >
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                </Identity>
                <WalletDropdownBasename />
                <WalletDropdownLink
                    icon="wallet"
                    href="https://keys.coinbase.com"
                >
                    Wallet
                </WalletDropdownLink>
                <WalletDropdownFundLink />
                <WalletDropdownDisconnect />
            </WalletDropdown>
        </Wallet>
    );
}