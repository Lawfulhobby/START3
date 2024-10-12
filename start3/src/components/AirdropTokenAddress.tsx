// src/app/components/AirdropTokenAddress.tsx

'use client';

import React, { useEffect, useState } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, formatUnits, JsonRpcProvider } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

interface AirdropTokenAddressProps {
    // Optional: Define any props if needed in the future
}

const AirdropTokenAddress: React.FC<AirdropTokenAddressProps> = () => {
    const { account, chainId } = useWallet();

    // State variables
    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Optional: Admin check if needed
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

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

    useEffect(() => {
        const fetchTokenAddress = async () => {
            console.log('Fetching current token contract address from Airdrop contract...');

            setIsLoading(true);
            setIsError(false);
            setSuccessMessage('');

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);

                // Fetch token contract address
                // Assuming the function is named 'getTokenContract' or it's a public variable 'tokenContract'
                // Adjust the function name based on your actual contract
                let currentTokenAddress: string;

                try {
                    // First, try calling 'getTokenContract' function
                    currentTokenAddress = await contract._tokenContract();
                } catch (err) {
                    console.warn("'getTokenContract' function not found. Trying 'tokenContract' variable...");

                    // If 'getTokenContract' doesn't exist, try accessing 'tokenContract' variable
                    currentTokenAddress = await contract.tokenContract();
                }

                console.log(`Current Token Contract Address: ${currentTokenAddress}`);

                setTokenAddress(currentTokenAddress);
            } catch (error) {
                console.error('Error fetching token contract address:', error);
                setIsError(true);
                setTokenAddress('');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokenAddress();
    }, [account, chainId]);

    // Optional: Manual refresh function
    const handleRefresh = () => {
        // Re-fetch the token address by re-running the effect
        setIsLoading(true);
        setIsError(false);
        setSuccessMessage('');

        const fetchTokenAddress = async () => {
            console.log('Refreshing token contract address...');

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);

                // Fetch token contract address
                let currentTokenAddress: string;

                try {
                    currentTokenAddress = await contract.getTokenContract();
                } catch (err) {
                    console.warn("'getTokenContract' function not found. Trying 'tokenContract' variable...");

                    currentTokenAddress = await contract.tokenContract();
                }

                console.log(`Refreshed Token Contract Address: ${currentTokenAddress}`);

                setTokenAddress(currentTokenAddress);
                setSuccessMessage('Token contract address refreshed successfully!');
            } catch (error) {
                console.error('Error refreshing token contract address:', error);
                setIsError(true);
                setTokenAddress('');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokenAddress();
    };

    return (
        <div className='mt-12 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Current Token Contract Address</h2>
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span className='text-red-500'>Error fetching token contract address.</span>
            ) : (
                <span>{tokenAddress}</span>
            )}
            {/* Optional: Refresh Button */}
            <button
                onClick={handleRefresh}
                disabled={isLoading}
                className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
                {isLoading ? 'Refreshing...' : 'Refresh Address'}
            </button>
            {successMessage && <span className='text-green-500'>{successMessage}</span>}
        </div>
    );
};

export default AirdropTokenAddress;