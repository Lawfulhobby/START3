import { ethers, Provider, InterfaceAbi, JsonRpcProvider } from "ethers";
import { STRT_ADDRESS, STRT_ABI, AIRDROP_ABI, AIRDROP_ADDRESS } from '@/lib/contract';

const rpcUrl = "https://sepolia.base.org";

const fetchContract = (ADDRESS: string, ABI: InterfaceAbi, PROVIDER: Provider) =>
    new ethers.Contract(ADDRESS, ABI, PROVIDER);

export const AirdropContract = async (signer?: boolean) => {
    try {
        // Initialize provider
        const provider = new JsonRpcProvider(rpcUrl);

        const contract = fetchContract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const TokenContract = async () => {
    try {
        // Initialize provider
        const provider = new JsonRpcProvider(rpcUrl);

        const contract = fetchContract(STRT_ADDRESS, STRT_ABI, provider);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

// export const getBalance = async () => {
//     try {
//         // Initialize provider
//         const provider = new JsonRpcProvider(rpcUrl);
//         const signer = provider.getSigner();

//         return await signer.getBalance();
//     } catch (error) {
//         console.log(error);
//     }
// };
