// @ts-nocheck
"use client"

import React, { useState, useEffect } from "react";
import useWallet from "@/lib/useWallet";
import { ethers, formatEther, formatUnits, parseUnits } from "ethers";
import { AirdropContract, TokenContract } from "./constants";
import { AIRDROP_ABI, AIRDROP_ADDRESS, STRT_ADDRESS, STRT_ABI } from "@/lib/contract";
import { useToast } from "@/hooks/use-toast";

export const CONTEXT = React.createContext();

export const ContractProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { account: address, chainId, signer } = useWallet();
    const [loader, setLoader] = useState(false);
    const [balance, setBalance] = useState("");
    const [airdropBalance, setAirdropBalance] = useState("");
    const [claimStatus, setClaimStatus] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [airdropFee, setAirdropFee] = useState("");
    const [contractBalEther, setContractBalEther] = useState("");
    const [airdropPerUser, setAirdropPerUser] = useState("");
    const [contractOwnerAddr, setContractOwnerAddr] = useState("");
    const [connectedTokenAddr, setConnectedTokenAddr] = useState("");
    const [count, setCount] = useState(0);
    const { toast } = useToast()

    //NOTIFICATION
    // const notifyError = (msg: any) => toast.error(msg, { duration: 4000 });
    // const notifySuccess = (msg: any) => toast.success(msg, { duration: 4000 });

    const fetchInitialData = async () => {
        try {
            if (address) {
                setLoader(true);
                //GET USER BALANCE

                //TBCDistributor_CONTRACT
                const AIRDROP_CONTRACT = await AirdropContract();

                if (!AIRDROP_CONTRACT) return null

                //TOKEN CONTRACT
                const liveTokenAddr = await AIRDROP_CONTRACT._tokenContract();
                setConnectedTokenAddr(liveTokenAddr);

                //CONTRACT OWNER ADDRESS
                const contractOwner = await AIRDROP_CONTRACT.owner();
                setContractOwnerAddr(contractOwner);

                //AIRDROP BLANCE CHECK
                const contractTokenBal = await AIRDROP_CONTRACT.tokenBalance(
                    STRT_ADDRESS
                );
                setAirdropBalance(
                    formatEther(contractTokenBal.toString())
                );
                console.log(formatEther(contractTokenBal.toString()));

                //FEE
                const fee = await AIRDROP_CONTRACT._fee();
                setAirdropFee(formatEther(fee));

                //CONTRACT BALANCE
                const contractBalanceBal = await AIRDROP_CONTRACT.contractBalance();
                setContractBalEther(formatEther(contractBalanceBal));

                //AIRDROP AMOUNT PER USER
                const airdropAmountUser = await AIRDROP_CONTRACT._airdropAmount();
                setAirdropPerUser(formatEther(airdropAmountUser));

                //GET ALL  USERS
                const getAllUsers = await AIRDROP_CONTRACT.getAllAirdrops();
                const transaction = await AIRDROP_CONTRACT.airdropInfos(Number(0));

                const transactionData = {
                    id: transaction[0].toNumber(),
                    useraddress: transaction[1],
                    sessionId: transaction[2],
                    flowId: transaction[3],
                    timestamp: new Date(transaction[4].toNumber() * 1000).toDateString(),
                };

                console.log("Trans", transactionData)

                const parsedAllUsers = getAllUsers.map((user: any, i: Number) => ({
                    id: user[0].toNumber(),
                    useraddress: user[1],
                    sessionId: user[2],
                    flowId: user[3],
                    timestamp: new Date(user[4].toNumber() * 1000).toDateString(),
                }));

                console.log("All users", parsedAllUsers)

                setAllUsers(parsedAllUsers);

                //TOKEN CONTRACT BALANCE
                const TOKEN_CONTRACT = await TokenContract();
                if (!TOKEN_CONTRACT) return null
                const selectedTokenBal = await TOKEN_CONTRACT.balanceOf(address);

                const tokenClaimUserBal = formatEther(
                    selectedTokenBal.toString()
                );

                if (Number(tokenClaimUserBal) <= 1) {
                    const filteredCampaigns = getAllUsers.filter((user: { useraddress: string; }) =>
                        user.useraddress.toLowerCase() === address.toLowerCase()
                            ? setClaimStatus(true)
                            : setClaimStatus(false)
                    );
                } else {
                    setClaimStatus(true);
                }

                setLoader(false);
            }
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            toast({
                variant: 'destructive',
                description: `${errorMsg}`,
            })
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [address, count]);

    const SET_AIRDROP_AMOUNT = async (airdropAmount: number) => {
        try {
            setLoader(true);

            if (!signer) {
                throw new Error('Signer not available.');
            }

            //GET USER ACCOUNT
            const AIRDROP_CONTRACT = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer)


            // Convert amount to Wei (assuming 18 decimals)
            const amountInWei = parseUnits(airdropAmount.toString(), "ether");

            const tx = await AIRDROP_CONTRACT.setAirdropAmount(
                amountInWei, {
                gasLimit: 1000000,
            }
            );

            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setLoader(false);
            // notifySuccess("Airdrop Amount Updated");
            toast({
                description: "Airdrop Amount Updated",
              })
            setCount(count + 1);
            // window.location.reload();
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            toast({
                variant: 'destructive',
                description: `${errorMsg}`,
            })
            console.log(error);
        }
    };

    const SET_FEE = async (fee: number) => {
        try {
            setLoader(true);

            if (!signer) {
                throw new Error('Signer not available.');
            }

            //GET USER ACCOUNT
            const AIRDROP_CONTRACT = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer)

            const airdropFee = parseUnits(fee.toString(), "ether");

            if (!AIRDROP_CONTRACT) return null;

            const transaction = await AIRDROP_CONTRACT.setFee(
                airdropFee,
                {
                    gasLimit: BigInt(1000000),
                }
            );

            await transaction.wait();

            setLoader(false);
            // notifySuccess("Airdrop Fee Updated");
            toast({
                description: "Airdrop Fee Updated",
              })
            setCount(count + 1);
            // window.location.reload();
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            toast({
                // variant='destructive',
                description: `${errorMsg}`,
            })
            console.log(error);
        }
    };

    const TRANSFER_FUNDS = async (amount: number) => {
        try {
            setLoader(true);

            if (!signer) {
                throw new Error('Signer not available.');
            }

            // Initialize STRT token contract with signer
            const strtContract = new ethers.Contract(STRT_ADDRESS, STRT_ABI, signer);

            // Convert amount to Wei (assuming 18 decimals)
            const amountInWei = parseUnits(amount.toString(), 18);

            // Send transaction to transfer STRT tokens to Airdrop contract
            const tx = await strtContract.transfer(AIRDROP_ADDRESS, amountInWei);
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setLoader(false);
            // notifySuccess(`Successfully transferred ${amount} STRT to Airdrop contract!`);
            toast({
                description: `Successfully transferred ${amount} STRT to Airdrop contract!`,
              })
            setCount(count + 1);
            // window.location.reload();
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            toast({
                variant: 'destructive',
                description: `${errorMsg}`,
            })
            console.log(error);
        }
    };

    const CLAIM_AIRDROP = async (
        sessionId: string,
        flowId: string
    ) => {
        if (!sessionId || !flowId) {
            alert('Please enter both Session ID and Flow ID.');
            return;
        }

        try {
            setLoader(true);

            if (!signer) {
                throw new Error('Signer not available.');
            }

            // Initialize Airdrop contract with signer
            const airdropContract = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer);

            // Convert fee to Wei
            const feeCharge = await airdropContract._fee();

            // Send transaction to dropTokens
            const tx = await airdropContract.dropTokens(
                sessionId,
                flowId,
                {
                    value: feeCharge.toString(),
                    gasLimit: BigInt(1000000),
                });
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction mined:', tx.hash);

            setLoader(false);

            toast({
                description: 'Airdrop claimed successfully!',
              })
            setCount(count + 1);
            // window.location.reload();
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            toast({
                variant: 'destructive',
                description: `${errorMsg}`,
            })
            console.log(error);
        }
    };

    return (
        <CONTEXT.Provider
            value={{
                SET_FEE,
                SET_AIRDROP_AMOUNT,
                TRANSFER_FUNDS,
                CLAIM_AIRDROP,

                address,
                chainId,

                connectedTokenAddr,
                contractOwnerAddr,
                airdropPerUser,
                allUsers,
                airdropFee,
            }}
        >
            {children}
        </CONTEXT.Provider>
    )
}

function parseErrorMsg(error: unknown) {
    throw new Error("Function not implemented.");
}
