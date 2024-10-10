// CONTEXT_Provider.tsx
// @ts-nocheck
import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useEthersSigner } from "./ethers";
import { getAirdropFee, getAirdropTransaction, getEthersProvider, setAirdropAmount, setTokenContract, STRT_ADDRESS, transferStartToken, withdrawEther, withdrawTokens } from "./contract";
import {   useAccount } from "wagmi";
import {
  getAirdropContract,
  getAirdropContractWithSigner,
  getStartTokenContract,
  getStartTokenContractWithSigner,
  claimAirdrop,
  hasUserClaimedAirdrop,
  // ... other functions
} from "./contract";
import { AirdropInfo, ClaimAirdropParams, WithdrawTokensParams, TransferTokenParams } from "./types";

export const CONTEXT = createContext<any>(null); // Update with proper type

export const CONTEXT_Provider = ({ children }: { children: React.ReactNode }) => {
  const DAPP_NAME = "Start3 Airdrop Dapp";
  const [loader, setLoader] = useState(false);
  const [balance, setBalance] = useState("");
  const [airdropBalance, setAirdropBalance] = useState("");
  const [claimStatus, setClaimStatus] = useState(false);
  const [allUsers, setAllUsers] = useState<AirdropInfo[]>([]);
  const [airdropFee, setAirdropFee] = useState("");
  const [contractBalEther, setContractBalEther] = useState("");
  const [airdropPerUser, setAirdropPerUser] = useState("");
  const [contractOwnerAddr, setContractOwnerAddr] = useState("");
  const [connectedTokenAddr, setConnectedTokenAddr] = useState("");
  const [count, setCount] = useState(0);

  // wagmi hooks
  const signer = useEthersSigner()
  const provider = getEthersProvider();
  const { address, isConnected } = useAccount();

  // NOTIFICATION
  const notifyError = (msg: string) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg: string) => toast.success(msg, { duration: 4000 });

  const fetchInitialData = async () => {
    try {
      if (isConnected && address && provider) {
        setLoader(true);
        // GET USER BALANCE
        const balance = await (await provider).getBalance(address);
        setBalance(ethers.formatEther(balance));

        // AIRDROP_CONTRACT
        const airdropContract = getAirdropContract(provider);

        // TOKEN CONTRACT
        const liveTokenAddr = await airdropContract._tokenContract();
        setConnectedTokenAddr(liveTokenAddr);

        // CONTRACT OWNER ADDRESS
        const contractOwner = await airdropContract.owner();
        setContractOwnerAddr(contractOwner);

        // AIRDROP BALANCE CHECK
        const contractTokenBal = await airdropContract.tokenBalance(STRT_ADDRESS);
        setAirdropBalance(ethers.formatEther(contractTokenBal));

        // FEE
        const fee = await airdropContract._fee();
        setAirdropFee(ethers.formatEther(fee));

        // CONTRACT BALANCE
        const contractBalanceBal = await airdropContract.contractBalance();
        setContractBalEther(ethers.formatEther(contractBalanceBal));

        // AIRDROP AMOUNT PER USER
        const airdropAmountUser = await airdropContract._airdropAmount();
        setAirdropPerUser(ethers.formatEther(airdropAmountUser));

        // GET ALL USERS
        const getAllUsers = await airdropContract.getAllAirdrops();

        const parsedAllUsers: AirdropInfo[] = getAllUsers.map((user: any) => ({
          id: user.id.toNumber(),
          useraddress: user.useraddress,
          sessionId: user.sessionId,
          flowId: user.flowId,
          timestamp: new Date(user.timestamp.toNumber() * 1000).toLocaleString(),
        }));

        setAllUsers(parsedAllUsers);

        // TOKEN CONTRACT BALANCE
        const startTokenContract = getStartTokenContract(provider);
        const selectedTokenBal = await startTokenContract.balanceOf(address);
        const tokenClaimUserBal = ethers.formatEther(selectedTokenBal);

        // Update claim status based on token balance
        if (parseFloat(tokenClaimUserBal) <= 1.0) {
          const hasClaimed = await hasUserClaimedAirdrop(address);
          setClaimStatus(hasClaimed);
        } else {
          setClaimStatus(true);
        }

        setLoader(false);
      }
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [address, isConnected, count]);

  // CLAIM AIRDROP FUNCTION
  const claimAirdropHandler = async (params: ClaimAirdropParams) => {
    try {
      setLoader(true);
      const { sessionId, flowId } = params;

      if (!sessionId || !flowId) {
        setLoader(false);
        return notifyError("Provide all details to claim airdrop");
      }

      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const fee = await getAirdropFee();

      const tx = await claimAirdrop(signer, sessionId, flowId, fee);
      await tx.wait();

      setLoader(false);
      notifySuccess("Airdrop Claimed Successfully");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // ADMIN FUNCTIONS

  // SET TOKEN CONTRACT ADDRESS
  const setTokenContractHandler = async (tokenContractAddress: string) => {
    try {
      setLoader(true);
      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await setTokenContract(tokenContractAddress);
      await tx.wait();

      setLoader(false);
      notifySuccess("Token Contract Updated");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // SET AIRDROP AMOUNT
  const setAirdropAmountHandler = async (airdropAmount: string) => {
    try {
      setLoader(true);
      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await setAirdropAmount(airdropAmount);
      await tx.wait();

      setLoader(false);
      notifySuccess("Airdrop Amount Updated");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // SET FEE
  const setFeeHandler = async (fee: string) => {
    try {
      setLoader(true);
      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await setAirdropFee(fee);
      await tx.wait();

      setLoader(false);
      notifySuccess("Airdrop Fee Updated");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // WITHDRAW TOKENS
  const withdrawTokensHandler = async (params: WithdrawTokensParams) => {
    try {
      setLoader(true);
      const { beneficiary, tokenAddr } = params;

      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await withdrawTokens(beneficiary, tokenAddr);
      await tx.wait();

      setLoader(false);
      notifySuccess("Withdraw Airdrop Tokens Successfully");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // WITHDRAW ETHER
  const withdrawEtherHandler = async (beneficiary: string) => {
    try {
      setLoader(true);
      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await withdrawEther(beneficiary);
      await tx.wait();

      setLoader(false);
      notifySuccess("Withdraw Ether Successfully");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  // GET SINGLE TRANSACTION
  const getSingleTransaction = async (id: number): Promise<AirdropInfo | undefined> => {
    try {
      setLoader(true);
      const transaction = await getAirdropTransaction(id);
      setLoader(false);
      notifySuccess("Transaction Retrieved Successfully");
      return transaction;
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
      return undefined;
    }
  };

  // TRANSFER TOKEN
  const transferTokenHandler = async (params: TransferTokenParams) => {
    try {
      setLoader(true);
      const { address: to, amount } = params;

      if (!signer) {
        setLoader(false);
        return notifyError("No signer available");
      }

      const tx = await transferStartToken(to, amount);
      await tx.wait();

      setLoader(false);
      notifySuccess("Tokens Transferred Successfully");
      setCount((prev) => prev + 1);
    } catch (error: any) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <CONTEXT.Provider
      value={{
        // User Functions
        claimAirdrop: claimAirdropHandler,
        // Admin Functions
        setTokenContract: setTokenContractHandler,
        setAirdropAmount: setAirdropAmountHandler,
        setFee: setFeeHandler,
        withdrawTokens: withdrawTokensHandler,
        withdrawEther: withdrawEtherHandler,
        getSingleTransaction,
        transferToken: transferTokenHandler,
        // State
        address,
        loader,
        claimStatus,
        DAPP_NAME,
        balance,
        // Admin State
        contractOwnerAddr,
        airdropPerUser,
        contractBalEther,
        connectedTokenAddr,
        airdropBalance,
        airdropFee,
        allUsers,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};

function parseErrorMsg(error: any) {
    throw new Error("Function not implemented.");
}
