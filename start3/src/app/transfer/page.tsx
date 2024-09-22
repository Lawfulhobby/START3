// app/page.tsx
// @ts-nocheck
'use client'

import { useState } from 'react';
import { sendGas } from '@/lib/TokenTransaction';
import { useAccount } from "wagmi"; // Import useAccount

export default function Home() {
    const { address, isConnected } = useAccount(); // Get connection status
    const [status, setStatus] = useState('');
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');

    const to = address;
    const amount = "0.1"
    const privateKey = "b6e0138f44fa6ba4363923c4fc21307d0816287ec9dfe9dd3bf52fd9f6473eb8"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending transaction...');
        setError('');
        setTxHash('');

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Send ETH (Gas) to {address}</h1>
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Claim Reward
                    </button>
                </form>

                {status && <p className="text-green-500 mt-4 text-center">{status}</p>}
                {txHash && (
                    <p className="mt-2 text-center">
                        Transaction Hash:{' '}
                        <a
                            href={`https://arb-sepolia.g.alchemy.com/v2/${txHash}`}
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
        </div>
    );
}