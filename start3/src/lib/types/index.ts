// src/types/index.ts

export interface AirdropInfo {
    id: number;
    useraddress: string;
    sessionId: string;
    flowId: string;
    timestamp: string;
  }
  
  export interface ClaimAirdropParams {
    sessionId: string;
    flowId: string;
    fee: string; // Fee in ETH as a string (e.g., '0.005')
  }
  
  export interface WithdrawTokensParams {
    beneficiary: string;
    tokenAddr: string;
  }
  
  export interface TransferTokenParams {
    address: string;
    amount: string;
  }