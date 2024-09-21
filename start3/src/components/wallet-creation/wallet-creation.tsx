// app/create-wallet/page.tsx
// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { Wallet } from 'ethers'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function WalletCreation() {
    const [wallet, setWallet] = useState<Wallet | null>(null)
    const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false)
    const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false)

    useEffect(() => {
        const generateWallet = () => {
            const newWallet = Wallet.createRandom()
            setWallet(newWallet)
        }

        generateWallet()
    }, [])

    const togglePrivateKeyVisibility = () => {
        setShowPrivateKey((prev) => !prev)
    }

    const toggleSeedPhraseVisibility = () => {
        setShowSeedPhrase((prev) => !prev)
    }

    if (!wallet) {
        return (
            <div className="flex items-center justify-center ">
                <p className="text-xl">Generating wallet...</p>
            </div>
        )
    }

    return (
        // <div className=" bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-neutral-100 shadow-lg rounded-lg p-8 max-w-2xl w-full">
            <div className="space-y-4">
                {/* Address */}
                <div>
                    <h2 className="text-lg font-semibold text-neutral-500">Address</h2>
                    <p className="break-all text-neutral-500">{wallet.address}</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-neutral-500'>Private Key</AccordionTrigger>
                        <AccordionContent className='text-neutral-500'>
                            {wallet.privateKey}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='text-neutral-500'>Seed Phrase</AccordionTrigger>
                        <AccordionContent className='text-neutral-500'>
                            {wallet.mnemonic?.phrase}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div className="mt-6">
                <p className="text-neutral-500 text-xs">
                    <strong>Warning:</strong> Store your private key and seed phrase securely. Anyone with access to them can control your wallet.
                </p>
            </div>
        </div>
        // </div>
    )
}
