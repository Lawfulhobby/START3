// src/context/AirdropContext.tsx
// @ts-nocheck
'use client';

import React, { createContext, useContext } from 'react';
import {
    useReadContract,
  usePrepareContractWrite,
  useWriteContract,
  useWaitForTransaction,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { AirdropABI } from '../constants/abis';
import { AIRDROP_ADDRESS } from '../constants/addresses';
import { AirdropInfo, ClaimAirdropParams } from '../types';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

interface AirdropContextProps {
  airdropRecords: AirdropInfo[];
  claimAirdrop: (params: ClaimAirdropParams) => void;
  isClaiming: boolean;
}

const AirdropContext = createContext<AirdropContextProps | undefined>(undefined);

export const AirdropProvider = ({ children }: { children: React.ReactNode }) => {
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();

  // Fetch all airdrop records
  const { data, isError, isLoading, refetch } = useReadContract({
    address: AIRDROP_ADDRESS,
    abi: AirdropABI,
    functionName: 'getAllAirdrops',
    // watch: true, // Automatically refetch on new blocks
    enabled: !!publicClient,
  });

  const airdropRecords: AirdropInfo[] = data
    ? data.map((info: any) => ({
        id: info.id.toNumber(),
        useraddress: info.useraddress,
        sessionId: info.sessionId,
        flowId: info.flowId,
        timestamp: new Date(info.timestamp.toNumber() * 1000).toLocaleString(),
      }))
    : [];

  // Prepare contract write for claiming airdrop
  const { config, error: prepareError } = usePrepareContractWrite({
    address: AIRDROP_ADDRESS,
    abi: AirdropABI,
    functionName: 'dropTokens',
    args: [], // To be set dynamically
    overrides: {
      value: 0,
      gasLimit: 1000000, // Adjust as needed
    },
    enabled: false, // Initially disabled
  });

  const { data: writeData, error: writeError, write } = useContractWrite(config);

  const { isLoading: isClaiming, isSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess() {
      toast.success('Airdrop Claimed Successfully!');
      refetch(); // Refresh airdrop records
    },
    onError() {
      toast.error('Failed to claim Airdrop.');
    },
  });

  const claimAirdrop = (params: ClaimAirdropParams) => {
    const { sessionId, flowId, fee } = params;

    if (!sessionId || !flowId || !fee) {
      toast.error('Please provide all required fields.');
      return;
    }

    // Update the args and overrides before writing
    config.args = [sessionId, flowId];
    config.overrides = {
      value: ethers.parseEther(fee),
      gasLimit: 1000000, // Adjust as needed
    };

    write?.();
  };

  return (
    <AirdropContext.Provider value={{ airdropRecords, claimAirdrop, isClaiming }}>
      {children}
    </AirdropContext.Provider>
  );
};

export const useAirdrop = () => {
  const context = useContext(AirdropContext);
  if (context === undefined) {
    throw new Error('useAirdrop must be used within an AirdropProvider');
  }
  return context;
};