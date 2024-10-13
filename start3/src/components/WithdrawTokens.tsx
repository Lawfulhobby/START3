// src/app/components/WithdrawTokens.tsx

'use client';

import React, { useState, useEffect } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, JsonRpcProvider } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

const WithdrawTokens = () => {
    const { account, chainId, active, connector, signer } = useWallet();

    // State variables
    const [beneficiary, setBeneficiary] = useState<string>('');
    const [tokenAddress, setTokenAddress] = useState<string>('');
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

    const handleWithdrawTokens = async () => {
        if (!isAdmin) {
            alert('Only the admin can perform this action.');
            return;
        }

        if (!beneficiary || !ethers.isAddress(beneficiary)) {
            alert('Please enter a valid beneficiary address.');
            return;
        }

        if (!tokenAddress || !ethers.isAddress(tokenAddress)) {
            alert('Please enter a valid token contract address.');
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setSuccessMessage('');

        try {
            // const signer = getSigner();
            if (!signer) {
                throw new Error('Signer not available.');
            }

            // Initialize Airdrop contract with signer
            const airdropContract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer);

            // Send transaction to withdrawTokens
            const tx = await airdropContract.withdrawTokens(beneficiary, tokenAddress);
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setSuccessMessage('Tokens withdrawn successfully!');
            setBeneficiary('');
            setTokenAddress('');
        } catch (error) {
            console.error('Error withdrawing tokens:', error);
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
            <h2 className='text-xl font-semibold'>Admin: Withdraw Tokens</h2>
            <input
                type="text"
                placeholder="Beneficiary Address"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            <input
                type="text"
                placeholder="Token Contract Address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            <button
                onClick={handleWithdrawTokens}
                disabled={isLoading}
                className='p-2 bg-purple-500 text-white rounded hover:bg-purple-600'
            >
                {isLoading ? 'Withdrawing...' : 'Withdraw Tokens'}
            </button>
            {isError && <span className='text-red-500'>Failed to withdraw tokens.</span>}
            {successMessage && <span className='text-green-500'>{successMessage}</span>}
        </div>
    );
};

export default WithdrawTokens;