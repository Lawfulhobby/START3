// src/app/components/AirdropRecords.tsx

'use client';

import React, { useEffect, useState } from 'react';
import useWallet from '@/lib/useWallet';
import { ethers, JsonRpcProvider } from 'ethers';
import { AIRDROP_ADDRESS, AIRDROP_ABI } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

interface AirdropInfo {
    id: number;
    useraddress: string;
    sessionId: string;
    flowId: string;
    timestamp: string;
}

const AirdropRecords = () => {
    const { account, chainId, active, connector } = useWallet();

    // State variables
    const [airdrops, setAirdrops] = useState<AirdropInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchAirdrops = async () => {
            console.log('Fetching airdrop records...');

            setIsLoading(true);
            setIsError(false);

            try {
                // Initialize provider
                const provider = new JsonRpcProvider(rpcUrl);

                // Initialize contract
                const contract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);

                // Fetch all airdrops
                const airdropData = await contract.getAllAirdrops();

                console.log("Airdrop", airdropData);

                // Parse and format airdrop records
                // const parsedAirdrops: AirdropInfo[] = airdropData.map((airdrop: { id: { toNumber: () => any; }; useraddress: any; sessionId: any; flowId: any; timestamp: { toNumber: () => number; }; }) => ({
                //     id: airdrop.id.toNumber(),
                //     useraddress: airdrop.useraddress,
                //     sessionId: airdrop.sessionId,
                //     flowId: airdrop.flowId,
                //     timestamp: new Date(airdrop.timestamp.toNumber() * 1000).toLocaleString(),
                // }));

                const parsedAllUsers = airdropData.map((user: any, i: number) => ({
                    id: user[0].toNumber(),
                    useraddress: user[1],
                    sessionId: user[2],
                    flowId: user[3],
                    timestamp: new Date(user[7].toNumber() * 1000).toDateString(),
                }));

                console.log(parsedAllUsers);


                setAirdrops(parsedAllUsers);
            } catch (error) {
                console.error('Error fetching airdrop records:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAirdrops();
    }, [account, chainId]); // Re-run when account or chainId changes

    return (
        <div className='mt-12'>
            <h2 className='text-xl font-semibold mb-4'>Airdrop Records</h2>
            {isLoading ? (
                <span>Loading airdrop records...</span>
            ) : isError ? (
                <span className='text-red-500'>Error fetching airdrop records. {JSON.stringify(airdrops)}</span>
            ) : airdrops.length === 0 ? (
                <span>No airdrop records found.</span>
            ) : (
                <table className='min-w-full bg-white border'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border'>ID</th>
                            <th className='py-2 px-4 border'>User Address</th>
                            <th className='py-2 px-4 border'>Session ID</th>
                            <th className='py-2 px-4 border'>Flow ID</th>
                            <th className='py-2 px-4 border'>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airdrops.map((airdrop) => (
                            <tr key={airdrop.id}>
                                <td className='py-2 px-4 border'>{airdrop.id}</td>
                                <td className='py-2 px-4 border'>{airdrop.useraddress}</td>
                                <td className='py-2 px-4 border'>{airdrop.sessionId}</td>
                                <td className='py-2 px-4 border'>{airdrop.flowId}</td>
                                <td className='py-2 px-4 border'>{airdrop.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AirdropRecords;