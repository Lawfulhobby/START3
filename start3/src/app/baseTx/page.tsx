// @ts-nocheck
'use client';

import React, { useEffect, useState, useContext } from 'react';
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
import { TokenContract } from '@/apis/constants';
import { CONTEXT } from "../../apis/context_provider"
import { IncentiveCalculator } from '@/components/builder/incentive-calculator';

const Home = () => {
    const { account, active, connector, rpcUrl } = useWallet();
    const [fee, setFee] = useState("");
    const [airdropamount, setAirdropamount] = useState("");

    const {
        SET_FEE,
        SET_AIRDROP_AMOUNT,
        address,
        chainId,
        connectedTokenAddr,
        contractOwnerAddr,
        airdropPerUser,
        allUsers,
        airdropFee
    } = useContext(CONTEXT);

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
                const TOKEN_CONTRACT = await TokenContract();

                if (!TOKEN_CONTRACT) return null

                // Fetch token balance
                const balance = await TOKEN_CONTRACT.balanceOf(account);
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
            {/* SET_FEE */}
            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="contact-info-item">
                    <div className="icon">

                    </div>
                    <div className="content">
                        <h6 className="title">Airdrop Fee </h6>
                        <div className="input-group-new">
                            <label className="label-new">Airdrop Charge</label>
                            <input
                                onChange={(e) => setFee(e.target.value)}
                                placeholder={`${airdropFee || 0} Matic`}
                                type="text"
                            />
                            <div></div>
                        </div>

                        <button
                            onClick={() => SET_FEE(fee)}
                            className="btn margin-btn-new"
                        >
                            Update Fee For Airdrop
                        </button>
                    </div>
                </div>
            </div>

            {/* SET_AIRDROP_AMOUNT */}
            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="contact-info-item">
                    <div className="content">
                        <h6 className="title">Airdrop Amount </h6>

                        <div className="input-group-new">
                            <label className="label-new">Airdrop Claim Amount</label>
                            <input
                                onChange={(e) => setAirdropamount(e.target.value)}
                                placeholder={`${airdropPerUser || 0} Matic`}
                                type="text"
                            />
                            <div></div>
                        </div>
                        <button
                            onClick={() => SET_AIRDROP_AMOUNT(airdropamount)}
                            className="btn margin-btn-new"
                        >
                            Update Claim Airdrop
                        </button>
                    </div>
                </div>
            </div>

            <p>{connectedTokenAddr}</p>
            <p>{contractOwnerAddr}</p>
            <p>{airdropPerUser}</p>
            <p>{allUsers}</p>
            <p>{airdropFee}</p>

            <IncentiveCalculator/>
            <AdminSetAirdropAmount />
            <TransferFundsToAirdrop />
            <AirdropTokenAddress />
            <AirdropBalance />
            <ClaimAirdrop />
            <AirdropRecords />
            <AdminSetTokenContract />
            <WithdrawTokens />
        </main>
    );
};

export default Home;