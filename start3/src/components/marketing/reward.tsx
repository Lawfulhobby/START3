// app/page.tsx
// @ts-nocheck
'use client'

import { useState } from 'react';
import { sendGas } from '@/lib/TokenTransaction';
import { useAccount } from "wagmi"; // Import useAccount
import { Button } from '../ui/button';

export default function Reward() {
    const { address, isConnected } = useAccount(); // Get connection status
    const [status, setStatus] = useState('');
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');
    const [dis, setDis] = useState(false);

    const to = address;
    const amount = "0.1"
    const privateKey = "b6e0138f44fa6ba4363923c4fc21307d0816287ec9dfe9dd3bf52fd9f6473eb8"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending transaction...');
        setError('');
        setTxHash('');
        setDis(true);

        try {
            const result = await sendGas(amount, to, privateKey);
            setTxHash(result.transaction.hash);
            setStatus('Transaction sent successfully!');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setStatus('');
        }
    };

    return (
        <div className='mt-10 flex flex-col space-y-4'>
            <img src={'/ethcapetown.png'} alt={"eth"} className="h-100 w-full bg-black rounded object-contain p-5" />
            <form onSubmit={handleSubmit}>
                <Button
                    type="submit"
                    disabled={dis}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Claim Reward
                </Button>
            </form>

            {status && <p className="text-green-500 mt-4 text-center">{status}</p>}
            {txHash && (
                <p className="mt-2 text-center">
                    Transaction Hash:{' '}
                    <a
                        href={`https://sepolia.arbiscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {txHash}
                    </a>
                </p>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
    );
}