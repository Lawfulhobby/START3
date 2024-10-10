// types.ts

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
  }
  
  export interface WithdrawTokensParams {
    beneficiary: string;
    tokenAddr: string;
  }
  
  export interface TransferTokenParams {
    address: string;
    amount: string;
  }