// src/app/components/AdminSetAirdropAmount.tsx

'use client';

import React, { useState, useEffect } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, JsonRpcProvider, parseUnits, BigNumberish } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

interface AdminSetAirdropAmountProps {
    // Optional: Define any props if needed in the future
}

const AdminSetAirdropAmount: React.FC<AdminSetAirdropAmountProps> = () => {
    const { account, chainId, active, connector, signer } = useWallet();

    // State variables
    const [currentAirdropAmount, setCurrentAirdropAmount] = useState<string>('');
    const [newAirdropAmount, setNewAirdropAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    // Check if the connected account is admin
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

    // Fetch the current airdrop amount
    useEffect(() => {
        const fetchAirdropAmount = async () => {
            console.log('Fetching current airdrop amount from Airdrop contract...');

            setIsLoading(true);
            setIsError(false);
            setSuccessMessage('');

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);

                // Fetch current airdrop amount
                // Assuming the function is named 'getAirdropAmount' or it's a public variable 'airdropAmount'
                let amount: BigNumberish;

                try {
                    // First, try calling 'getAirdropAmount' function
                    amount = await contract.getAirdropAmount();
                } catch (err) {
                    console.warn("'getAirdropAmount' function not found. Trying 'airdropAmount' variable...");

                    // If 'getAirdropAmount' doesn't exist, try accessing 'airdropAmount' variable
                    amount = await contract.airdropAmount();
                }

                // Format the amount (assuming 18 decimals)
                const formattedAmount = ethers.formatUnits(amount, 18);
                console.log(`Current Airdrop Amount: ${formattedAmount} STRT`);

                setCurrentAirdropAmount(formattedAmount);
            } catch (error) {
                console.error('Error fetching airdrop amount:', error);
                setIsError(true);
                setCurrentAirdropAmount('');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAirdropAmount();
    }, [account, chainId]);

    // Handler to set a new airdrop amount
    const handleSetAirdropAmount = async () => {
        // Input Validation
        if (!isAdmin) {
            alert('Only the admin can perform this action.');
            return;
        }

        if (!newAirdropAmount || isNaN(Number(newAirdropAmount)) || Number(newAirdropAmount) <= 0) {
            alert('Please enter a valid airdrop amount.');
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

            // Convert amount to Wei (assuming 18 decimals)
            const amountInWei = parseUnits(newAirdropAmount, 18);

            // Send transaction to setAirdropAmount
            const tx = await airdropContract.setAirdropAmount(amountInWei);
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setSuccessMessage(`Airdrop amount successfully set to ${newAirdropAmount} STRT!`);

            // Optionally, refresh the current airdrop amount
            setCurrentAirdropAmount(newAirdropAmount);
            setNewAirdropAmount('');
        } catch (error: any) {
            console.error('Error setting airdrop amount:', error);
            setIsError(true);
            setSuccessMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAdmin) {
        return null; // Hide component if not admin
    }

    return (
        <div className='mt-12 flex flex-col gap-4 p-4 border border-gray-300 rounded'>
            <h2 className='text-xl font-semibold'>Admin: Set Airdrop Amount</h2>
            {isLoading && <span>Loading...</span>}
            {isError && <span className='text-red-500'>Error setting airdrop amount. Please try again.</span>}
            {successMessage && <span className='text-green-500'>{successMessage}</span>}
            <div>
                <strong>Current Airdrop Amount:</strong> {isLoading ? 'Loading...' : isError ? 'Error' : `${currentAirdropAmount} STRT`}
            </div>
            <input
                type="text"
                placeholder="New Airdrop Amount (STRT)"
                value={newAirdropAmount}
                onChange={(e) => setNewAirdropAmount(e.target.value)}
                className='p-2 border border-gray-300 rounded'
            />
            <button
                onClick={handleSetAirdropAmount}
                disabled={isLoading}
                className='p-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
                {isLoading ? 'Setting...' : 'Set Airdrop Amount'}
            </button>
        </div>
    );
};

export default AdminSetAirdropAmount;