'use client';

import React, { useEffect, useState } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, formatUnits, JsonRpcProvider } from 'ethers';
import { STRT_ADDRESS, STRT_ABI } from '@/lib/contract';
import { numberWithCommas } from '@/lib/utils/formatter';
import ClaimAirdrop from '@/components/ClaimAirdrop';
import AirdropRecords from '@/components/AirdropRecords';
import AdminSetTokenContract from '@/components/AdminSetTokenContract';
import WithdrawTokens from '@/components/WithdrawTokens';
import AirdropBalance from '@/components/AirdropBalance';
import AirdropTokenAddress from '@/components/AirdropTokenAddress';
import TransferFundsToAirdrop from '@/components/TransferFundsToAirdrop';
import AdminSetAirdropAmount from '@/components/AdminSetAirdropAmount';

const Home = () => {
    const { account, chainId, active, connector, rpcUrl } = useWallet();

    // State variables
    const [formattedBalance, setFormattedBalance] = useState<string>('0');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const getBalance = async () => {
            console.log('Calling get balance for address', account);

            if (!account) {
                setFormattedBalance('0');
                return;
            }

            setIsLoading(true);
            setIsError(false);

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(STRT_ADDRESS, STRT_ABI, provider);

                // Fetch token balance
                const balance = await contract.balanceOf(account);
                console.log(`Token balance is`, balance.toString());

                // Format the balance based on the decimals (assuming 18 decimals)
                const formatted = formatUnits(balance, 18);
                console.log(`Formatted balance: ${formatted}`);

                setFormattedBalance(formatted);
            } catch (error) {
                console.error(`Failed to get balance:`, error);
                setFormattedBalance('0');
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getBalance();
    }, [account, chainId]); // Re-run when account or chainId changes

    return (
        <main className='flex min-h-screen flex-col gap-12 p-24 text-black'>
            <span><strong>Address:</strong> {account ? account : 'Not Connected'}</span>
            <span><strong>Chain ID:</strong> {chainId ? chainId : 'N/A'}</span>
            <div>
                <strong>STRT Token Balance:</strong>{' '}
                {isLoading ? (
                    <span>Loading...</span>
                ) : isError ? (
                    <span style={{ color: 'red' }}>Error fetching balance</span>
                ) : (
                    <span>{numberWithCommas(formattedBalance)} STRT</span>
                )}
            </div>
            <AdminSetAirdropAmount/>
            <TransferFundsToAirdrop/>
            <AirdropTokenAddress/>
            <AirdropBalance />
            <ClaimAirdrop />
            <AirdropRecords />
            <AdminSetTokenContract />
            <WithdrawTokens />
        </main>
    );
};

export default Home;