
'use server';
import { SendTransaction } from "./create-tx";
import { Basename } from "@/apis/basenames";

export async function ServerSideTx(
    {
        basename,
        amount,
    }: {
        basename: Basename,
        amount: number,
    }) {
    return (
        <div>
            <SendTransaction
                basename={basename}
                initialValue={amount.toString()}
            />
        </div>
    );
}