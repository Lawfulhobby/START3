// src/app/components/AirdropBalance.tsx

'use client';

import React, { useEffect, useState } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, formatUnits, JsonRpcProvider } from 'ethers';
import { STRT_ADDRESS, STRT_ABI, AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

interface AirdropBalanceProps {
    // Optionally, you can pass props if needed
}

const AirdropBalance: React.FC<AirdropBalanceProps> = () => {
    const { account, chainId } = useWallet();

    // State variables
    const [contractBalance, setContractBalance] = useState<string>('0');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchContractBalance = async () => {
            console.log('Fetching Airdrop contract STRT balance...');
            
            // If there's no account connected, or wrong network, skip
            if (!account) {
                setContractBalance('0');
                return;
            }

            setIsLoading(true);
            setIsError(false);

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize STRT token contract
                const strtContract = new ethers.Contract(STRT_ADDRESS, STRT_ABI, provider);

                // Fetch STRT token balance of the Airdrop contract
                const balance = await strtContract.balanceOf(AIRDROP_ADDRESS);
                console.log(`Airdrop contract STRT balance (raw):`, balance.toString());

                // Format the balance (assuming 18 decimals)
                const formatted = formatUnits(balance, 18);
                console.log(`Airdrop contract STRT balance (formatted): ${formatted}`);

                setContractBalance(formatted);
            } catch (error) {
                console.error('Error fetching Airdrop contract balance:', error);
                setIsError(true);
                setContractBalance('0');
            } finally {
                setIsLoading(false);
            }
        };

        fetchContractBalance();
    }, [account, chainId]); // Re-fetch when account or chain changes

    return (
        <div className='mt-12 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Airdrop Contract STRT Balance</h2>
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span className='text-red-500'>Error fetching contract balance.</span>
            ) : (
                <span>{contractBalance} STRT</span>
            )}
        </div>
    );
};

export default AirdropBalance;