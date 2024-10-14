"use client"

import React, { useState, useEffect } from "react";
import useWallet from "@/lib/useWallet";
import { ethers, formatEther, formatUnits, parseUnits } from "ethers";
import { AirdropContract, TokenContract } from "./constants";
import { AIRDROP_ABI, AIRDROP_ADDRESS, STRT_ADDRESS } from "@/lib/contract";
import toast from "react-hot-toast";

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

    //NOTIFICATION
    const notifyError = (msg) => toast.error(msg, { duration: 4000 });
    const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

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
            notifyError(errorMsg);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [address, count]);

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
            notifySuccess("Airdrop Fee Updated");
            setCount(count + 1);
            // window.location.reload();
        } catch (error) {
            const errorMsg = parseErrorMsg(error);
            notifyError(errorMsg);
            console.log(error);
        }
    };


    return (
        <CONTEXT.Provider
            value={{
                SET_FEE,
                
                address,
                chainId,
                notifyError,
                notifySuccess,

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
