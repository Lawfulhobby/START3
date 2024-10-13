// src/app/components/ClaimAirdrop.tsx

'use client';

import React, { useState } from 'react';
import useWallet from '@/lib/useWallet';
import { BytesLike, ethers, hexlify } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI, STRT_ABI, STRT_ADDRESS } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

const ClaimAirdrop = () => {
    const { account, chainId, active, connector, signer } = useWallet();

    // State variables
    const [sessionId, setSessionId] = useState<string>('');
    const [flowId, setFlowId] = useState<string>('');
    // const [fee, setFee] = useState<string>('0.005'); // Example fee in ETH
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

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
            setSessionId('');
            setFlowId('');
            // setFee('0.005');
        } catch (error) {
            console.error('Error claiming airdrop:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Claim Your Airdrop</h2>
            <input
                type="text"
                placeholder="Session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            <input
                type="text"
                placeholder="Flow ID"
                value={flowId}
                onChange={(e) => setFlowId(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            {/* <input
                type="text"
                placeholder="Fee in ETH"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            /> */}
            <button
                onClick={handleClaimAirdrop}
                disabled={isLoading}
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
                {isLoading ? 'Claiming...' : 'Claim Airdrop'}
            </button>
            {isError && <span className='text-red-500'>Failed to claim airdrop. Please try again.</span>}
            {successMessage && <span className='text-green-500'>{successMessage}</span>}
        </div>
    );
};

export default ClaimAirdrop;