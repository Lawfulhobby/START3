import { useAccount } from "wagmi";
import { useEthersSigner } from "./ethers";
import { useEffect } from "react";

const rpcUrl = "https://sepolia.base.org";

export default function useWallet() {
  const { address, isConnected, connector, chain } = useAccount();
  const signer = useEthersSigner()

  return {
    account: address,
    active: isConnected,
    connector,
    chainId: chain?.id,
    signer: signer ?? undefined,
    rpcUrl,
  };
}
