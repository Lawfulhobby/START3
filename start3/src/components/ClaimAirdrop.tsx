// src/app/components/ClaimAirdrop.tsx

'use client';

import React, { useState } from 'react';
import useWallet from '@/lib/useWallet';
import { BytesLike, ethers, hexlify } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI, STRT_ABI, STRT_ADDRESS } from '@/lib/contract';
import { GradientBackground } from './gradient';
import { BackgroundGradient } from './ui/background-gradient';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from './ui/toast';
import Link from 'next/link';

const rpcUrl = "https://sepolia.base.org";

const ClaimAirdrop = ({ sessionId, flowId }: { sessionId: string, flowId: string }) => {
    const { account, chainId, active, connector, signer } = useWallet();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const { toast } = useToast()

    const handleClaimAirdrop = async () => {
        if (!account) {
            alert('Please connect your wallet.');
            return;
        }

        if (!sessionId || !flowId) {
            alert('Please enter both Session ID and Flow ID.');
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setSuccessMessage('');

        try {
            if (!signer) {
                throw new Error('Signer not available.');
            }

            // Initialize Airdrop contract with signer
            const airdropContract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer);

            // Convert fee to Wei
            const feeCharge = await airdropContract._fee();

            // Send transaction to dropTokens
            const tx = await airdropContract.dropTokens(
                sessionId,
                flowId,
                {
                    value: feeCharge.toString(),
                    gasLimit: BigInt(1000000),
                });
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setSuccessMessage('Airdrop claimed successfully!');

            toast({
                title: 'Airdrop claimed successfully!',
                description: `Tx hash: ${tx.hash}`,
                action: (
                    <ToastAction altText="Goto basescan">
                        <Link href={`https://sepolia.basescan.org/tx/${tx.hash}`} target="_blank">
                            View tx
                        </Link>
                    </ToastAction>
                ),
            })
            // setFee('0.005');
        } catch (error) {
            console.error('Error claiming airdrop:', error);
            setIsError(true);
            toast({
                variant: 'destructive',
                description: `Error claiming airdrop`,
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundGradient className="rounded-xl flex items-center justify-center p-5 bg-white">
            <div className='flex flex-col gap-4 w-full'>
                {/* <h2 className='text-xl font-semibold'>Claim Your Airdrop</h2> */}
                <button
                    onClick={handleClaimAirdrop}
                    disabled={isLoading}
                    className='p-2 w-full rounded-full bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    {isLoading ? 'Claiming...' : 'Claim Airdrop'}
                </button>
                {isError && <span className='text-red-500'>Failed to claim airdrop. Please try again.</span>}
                {successMessage && <span className='text-green-500'>{successMessage}</span>}
            </div>
        </BackgroundGradient>

    );
};

export default ClaimAirdrop;