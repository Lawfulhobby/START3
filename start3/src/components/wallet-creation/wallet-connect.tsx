// app/create-wallet/page.tsx
"use client";

import Image from "next/image";
import { ConnectBtn } from "@/components/connectButton";
import Profile from "@/components/profile";


export default function WalletConnect() {
  return (
    <div className="bg-neutral-800 rounded-lg pb-5 max-w-2xl w-full">
          <ConnectBtn />
    </div>
  )
}
