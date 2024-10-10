// contract.ts

import { ethers, Provider, parseEther, hexlify, formatEther} from "ethers";
import Airdrop from "../abis/Airdrop.json";
import StartToken from "../abis/StartToken.json";

// Contract Addresses
export const STRT_ADDRESS = "0xad1Bcd68C47f9f31Df1495Ff62b2567093C754ce";
const STRT_ABI = StartToken.abi;

export const AIRDROP_ADDRESS = "0xf8aE91c86627F5D3fb14BC7426BCCdf0C50f085A";
const AIRDROP_ABI = Airdrop.abi;

// Network Configurations
export const networks = {
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

// Helper to get the provider using ethers
const getEthersProvider = (): ethers.providers.Web3Provider => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  throw new Error("No Ethereum provider found. Install MetaMask.");
};

// Helper to get the signer using ethers
const getEthersSigner = (): ethers.providers.JsonRpcSigner => {
  const provider = getEthersProvider();
  return provider.getSigner();
};

// Initialize StartToken Contract
export const getStartTokenContract = (): ethers.Contract => {
  const provider = getEthersProvider();
  return new ethers.Contract(STRT_ADDRESS, STRT_ABI, provider);
};

// Initialize Airdrop Contract
export const getAirdropContract = (): ethers.Contract => {
  const provider = getEthersProvider();
  return new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);
};

// Initialize Airdrop Contract with Signer for write operations
export const getAirdropContractWithSigner = (): ethers.Contract => {
  const signer = getEthersSigner();
  return new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, signer);
};

// Initialize StartToken Contract with Signer for write operations
export const getStartTokenContractWithSigner = (): ethers.Contract => {
  const signer = getEthersSigner();
  return new ethers.Contract(STRT_ADDRESS, STRT_ABI, signer);
};

// Function to check if a user has already claimed the airdrop
export const hasUserClaimedAirdrop = async (userAddress: string): Promise<boolean> => {
  const airdropContract = getAirdropContract();
  const airdropInfos = await airdropContract.getAllAirdrops();

  return airdropInfos.some(
    (info: any) => info.useraddress.toLowerCase() === userAddress.toLowerCase()
  );
};

// Function to claim airdrop
export const claimAirdrop = async (
  sessionId: string,
  flowId: string,
  fee: string
): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();
  const feeInWei = parseEther(fee);

  const tx = await airdropContract.dropTokens(sessionId, flowId, {
    value: feeInWei,
    gasLimit: hexlify(1000000), // Adjust gas limit as needed
  });

  return tx;
};

// Administrative Functions

// Function to set the token contract address
export const setTokenContract = async (tokenContractAddress: string): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();
  const tx = await airdropContract.setTokenContract(tokenContractAddress, {
    gasLimit: hexlify(1000000),
  });
  return tx;
};

// Function to set the airdrop amount per user
export const setAirdropAmount = async (airdropAmount: string): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();
  const airdropAmountParsed = parseEther(airdropAmount);

  const tx = await airdropContract.setAirdropAmount(airdropAmountParsed, {
    gasLimit: hexlify(1000000),
  });

  return tx;
};

// Function to set the airdrop fee
export const setAirdropFee = async (fee: string): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();
  const feeParsed = parseEther(fee);

  const tx = await airdropContract.setFee(feeParsed, {
    gasLimit: hexlify(1000000),
  });

  return tx;
};

// Function to withdraw tokens from the airdrop contract
export const withdrawTokens = async (
  beneficiary: string,
  tokenAddr: string
): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();

  const tx = await airdropContract.withdrawTokens(beneficiary, tokenAddr, {
    gasLimit: hexlify(1000000),
  });

  return tx;
};

// Function to withdraw Ether from the airdrop contract
export const withdrawEther = async (
  beneficiary: string
): Promise<ethers.ContractTransaction> => {
  const airdropContract = getAirdropContractWithSigner();

  const tx = await airdropContract.withdrawEther(beneficiary, {
    gasLimit: hexlify(1000000),
  });

  return tx;
};

// Function to transfer StartToken
export const transferStartToken = async (
  to: string,
  amount: string
): Promise<ethers.ContractTransaction> => {
  const startTokenContract = getStartTokenContractWithSigner();
  const amountParsed = parseEther(amount);

  const tx = await startTokenContract.transfer(to, amountParsed, {
    gasLimit: hexlify(1000000),
  });

  return tx;
};

// Function to get all airdrop records
export const getAllAirdrops = async (): Promise<any[]> => {
  const airdropContract = getAirdropContract();
  const airdropInfos = await airdropContract.getAllAirdrops();

  // Parsing the airdrop infos to a more readable format
  const parsedAirdrops = airdropInfos.map((info: any) => ({
    id: info.id.toNumber(),
    useraddress: info.useraddress,
    sessionId: info.sessionId,
    flowId: info.flowId,
    timestamp: new Date(info.timestamp.toNumber() * 1000).toLocaleString(),
  }));

  return parsedAirdrops;
};

// Function to get a single airdrop transaction
export const getAirdropTransaction = async (id: number): Promise<any> => {
  const airdropContract = getAirdropContract();
  const transaction = await airdropContract.airdropInfos(id);

  return {
    id: transaction.id.toNumber(),
    useraddress: transaction.useraddress,
    sessionId: transaction.sessionId,
    flowId: transaction.flowId,
    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
  };
};

// Function to get token balance of a user
export const getTokenBalance = async (userAddress: string): Promise<string> => {
  const startTokenContract = getStartTokenContract();
  const balance = await startTokenContract.balanceOf(userAddress);
  return formatEther(balance);
};

// Function to get airdrop contract Ether balance
export const getAirdropEtherBalance = async (): Promise<string> => {
  const provider = getEthersProvider();
  const balance = await provider.getBalance(AIRDROP_ADDRESS);
  return formatEther(balance);
};

// Function to get airdrop contract token balance
export const getAirdropTokenBalance = async (): Promise<string> => {
  const airdropContract = getAirdropContract();
  const balance = await airdropContract.tokenBalance(STRT_ADDRESS);
  return formatEther(balance);
};

// Function to get airdrop fee
export const getAirdropFee = async (): Promise<string> => {
  const airdropContract = getAirdropContract();
  const fee = await airdropContract._fee();
  return formatEther(fee);
};

// Function to get airdrop amount per user
export const getAirdropAmountPerUser = async (): Promise<string> => {
  const airdropContract = getAirdropContract();
  const amount = await airdropContract._airdropAmount();
  return formatEther(amount);
};