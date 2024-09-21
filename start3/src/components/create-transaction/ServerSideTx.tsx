// @ts-nocheck
'use server';
import { SendTransaction } from "./create-tx";

export async function ServerSideTx(
    {
        walletAddress,
        amount,
    }: {
        walletAddress: string,
        amount: number,
    }) {
    return (
        <div>
            <SendTransaction
                toAddress={walletAddress}
                initialValue={amount.toString()}
            />
        </div>
    );
}