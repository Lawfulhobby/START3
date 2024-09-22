import { DEFAULT_CHAIN_ID, CHAINDATA } from "./chain";
import { ethers, JsonRpcProvider, parseUnits, parseEther } from "ethers";

const Erc20Abi = [
    "function transfer(address to, uint amount) returns (bool)",
];

const rpcUrl = "https://arb-sepolia.g.alchemy.com/v2/c97CL1lNLToBHEhwWUwI04ga2V9qJqSS";

export async function sendToken(
    amount: string,
    to: string,
    privateKey: string,
    tokenAddress: string | null,
    tokenDecimals = 18
) {
    // Create a provider using the RPC URL for the default chain
    const provider = new JsonRpcProvider(rpcUrl);

    // Create a wallet instance from the sender's private key and connect it to the provider
    const wallet = new ethers.Wallet(privateKey, provider);

    if (tokenAddress && tokenAddress !== '0x') {
        // The ERC-20 contract for the token you wish to transfer
        const contract = new ethers.Contract(tokenAddress, Erc20Abi, wallet);

        // Ensure the amount is formatted correctly for the token's decimals
        const formattedAmount = parseUnits(amount.toString(), tokenDecimals);

        // Perform the transfer
        const transaction = await contract.transfer(to, formattedAmount);

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();

        return { transaction, receipt };
    } else {
        // Transfer the native ETH token
        const transaction = await wallet.sendTransaction({
            to,
            value: parseEther(amount.toString())
        });

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();

        return { transaction, receipt };
    }
}

export async function sendGas(
    amount: string,
    to: string,
    privateKey: string,
) {
    // Create a provider using the RPC URL for the default chain
    const provider = new JsonRpcProvider(rpcUrl);

    // Create a wallet instance from the sender's private key and connect it to the provider
    const wallet = new ethers.Wallet(privateKey, provider);

    // Construct the transaction object
    const tx = {
        to,
        value: parseEther(amount.toString()),
    };

    // Sign the transaction with the sender's wallet
    const transaction = await wallet.sendTransaction(tx);

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();

    return { transaction, receipt };
}