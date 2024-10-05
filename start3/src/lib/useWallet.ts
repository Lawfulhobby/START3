import { useAccount} from "wagmi";

export default function useWallet() {
  const { address, isConnected, connector, chain } = useAccount();

  return {
    account: address,
    active: isConnected,
    connector,
    chainId: chain?.id,
  };
}
