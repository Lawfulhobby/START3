// src/app/components/TransferFundsToAirdrop.tsx

'use client';

import React, { useState, useEffect } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, JsonRpcProvider, parseUnits } from 'ethers';
import { STRT_ADDRESS, STRT_ABI, AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

interface TransferFundsToAirdropProps {
    // Optional: Define any props if needed in the future
}

const TransferFundsToAirdrop: React.FC<TransferFundsToAirdropProps> = () => {
    const { account, chainId, active, connector, signer } = useWallet();

    // State variables
    const [amount, setAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!account) {
                setIsAdmin(false);
                return;
            }

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);

                // Assume the contract has an 'owner' function to get the admin address
                const owner: string = await contract.owner();
                console.log(`Contract owner: ${owner}`);

                if (account.toLowerCase() === owner.toLowerCase()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [account, chainId]);

    const handleTransfer = async () => {
        // Input Validation
        if (!isAdmin) {
            alert('Only the admin can perform this action.');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('Please enter a valid amount of STRT tokens.');
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setSuccessMessage('');

        try {
            if (!signer) {
                throw new Error('Signer not available.');
            }

            // Initialize STRT token contract with signer
            const strtContract = new ethers.Contract(STRT_ADDRESS, STRT_ABI, signer);

            // Convert amount to Wei (assuming 18 decimals)
            const amountInWei = parseUnits(amount, 18);

            // Send transaction to transfer STRT tokens to Airdrop contract
            const tx = await strtContract.transfer(AIRDROP_ADDRESS, amountInWei);
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setSuccessMessage(`Successfully transferred ${amount} STRT to Airdrop contract!`);
            setAmount('');
        } catch (error) {
            console.error('Error transferring funds:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAdmin) {
        return null; // Hide component if not admin
    }

    return (
        <div className='mt-12 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Admin: Transfer STRT Tokens to Airdrop Contract</h2>
            <input
                type="text"
                placeholder="Amount of STRT to Transfer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            <button
                onClick={handleTransfer}
                disabled={isLoading}
                className='p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'
            >
                {isLoading ? 'Transferring...' : 'Transfer STRT'}
            </button>
            {isError && <span className='text-red-500'>Failed to transfer STRT tokens. Please try again.</span>}
            {successMessage && <span className='text-green-500'>{successMessage}</span>}
        </div>
    );
};

export default TransferFundsToAirdrop;