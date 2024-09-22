// components/SendGasForm.tsx

'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

interface TransactionResponse {
  transactionHash: string;
  blockNumber: number;
  status: number;
  gasUsed: string;
}

export default function SendGasForm() {
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!ethers.isAddress(to)) {
      setStatus('Invalid recipient address.');
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus('Invalid amount.');
      return;
    }

    setLoading(true);
    setStatus('Sending transaction...');

    try {
      const response = await fetch('/api/sendGas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const txResponse = data as TransactionResponse;
      setStatus(`Transaction successful! Hash: ${txResponse.transactionHash}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Send Gas on Arbitrum Sepolia</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="to" className="block text-gray-700 mb-2">
            Recipient Address:
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="0x..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-2">
            Amount (ETH):
          </label>
          <input
            type="number"
            id="amount"
            step="0.0001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="e.g., 0.1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Sending...' : 'Send Gas'}
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
  );
}