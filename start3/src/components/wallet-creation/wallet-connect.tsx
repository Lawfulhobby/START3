// app/connect-wallet/page.tsx
// @ts-nocheck
'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

const ConnectWalletPage = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    addressOrName: address,
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Connect Your Wallet</h1>
        <ConnectButton />

        {isConnected && address && (
          <div className="mt-6 text-left">
            <p>
              <strong>Connected Address:</strong>{' '}
              <span className="break-all">{address}</span>
            </p>
            {balance && (
              <p>
                <strong>Balance:</strong> {balance.formatted} {balance.symbol}
              </p>
            )}
          </div>
        )}

        <div className="mt-6">
          <p className="text-gray-500 text-sm">
            Ensure you have a compatible wallet installed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletPage