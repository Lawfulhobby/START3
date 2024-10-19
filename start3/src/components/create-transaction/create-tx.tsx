// // @ts-nocheck
// "use client"
// import * as React from 'react'
// import {
//     type BaseError,
//     useSendTransaction,
//     useWaitForTransactionReceipt
// } from 'wagmi'
// import { parseEther } from 'viem'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// // Define the props interface
// interface SendTransactionProps {
//     // The recipient address, optional with a default empty string
//     toAddress?: `0x${string}`
//     // The initial value to send, optional with a default empty string
//     initialValue?: string
// }

// export function SendTransaction({
//     toAddress = '',
//     initialValue = ''
// }: SendTransactionProps) {
//     const {
//         data: hash,
//         error,
//         isPending,
//         sendTransaction
//     } = useSendTransaction()

//     // Handle form submission
//     async function submit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         const formData = new FormData(e.target as HTMLFormElement)
//         const to = formData.get('address') as `0x${string}`
//         const value = formData.get('value') as string

//         // Validate inputs (optional but recommended)
//         if (!/^0x[a-fA-F0-9]{40}$/.test(to)) {
//             alert('Invalid Ethereum address.')
//             return
//         }

//         if (isNaN(Number(value)) || Number(value) <= 0) {
//             alert('Please enter a valid amount.')
//             return
//         }

//         // Send the transaction
//         sendTransaction({ to, value: parseEther(value) })
//     }

//     const { isLoading: isConfirming, isSuccess: isConfirmed } =
//         useWaitForTransactionReceipt({
//             hash,
//         })

//     return (
//         <form onSubmit={submit} className='mt-10 flex flex-col space-y-4'>

//             {/* Address Input */}
//             <Input
//                 name="address"
//                 placeholder="0xA0Cf…251e"
//                 required
//                 defaultValue={toAddress}
//             />

//             {/* Value Input */}
//             <Input
//                 name="value"
//                 placeholder="0.05"
//                 required
//                 defaultValue={initialValue}
//                 type="number"
//                 min="0"
//                 step="any"
//             />

//             {/* Submit Button */}
//             <Button
//             className='bg-purple-500 '
//                 disabled={isPending}
//                 type="submit"
//             >
//                 {isPending ? 'Confirming...' : 'Send'}
//             </Button>

//             {/* Transaction Status Messages */}
//             {hash && <div className="mt-2 text-sm text-gray-600">Transaction Hash: {hash}</div>}
//             {isConfirming && <div className="mt-2 text-sm text-yellow-600">Waiting for confirmation...</div>}
//             {isConfirmed && <div className="mt-2 text-sm text-green-600">Transaction confirmed.</div>}
//             {error && (
//                 <div className="mt-2 text-sm text-red-600">
//                     Error: {(error as BaseError).shortMessage || error.message}
//                 </div>
//             )}
//         </form>
//     )
// }

// @ts-nocheck
"use client"
import * as React from 'react'
import {
    type BaseError,
    useSendTransaction,
    useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getBasenameAddress, Basename } from '@/apis/basenames' // Import the basename resolver

// Define the props interface
interface SendTransactionProps {
    // The basename to resolve to an Ethereum address
    basename: Basename
    // The initial value to send, optional with a default empty string
    initialValue?: string
}

export function SendTransaction({
    basename,
    initialValue = ''
}: SendTransactionProps) {
    const [address, setAddress] = React.useState<`0x${string}` | null>(null)
    const [resolveLoading, setResolveLoading] = React.useState<boolean>(false)
    const [resolveError, setResolveError] = React.useState<string | null>(null)

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    // Effect to resolve basename to address whenever basename prop changes
    React.useEffect(() => {
        const resolveAddress = async () => {
            setResolveLoading(true)
            setResolveError(null)
            setAddress(null)
            try {
                const resolvedAddress = await getBasenameAddress(basename)
                if (!/^0x[a-fA-F0-9]{40}$/.test(resolvedAddress)) {
                    throw new Error('Resolved address is invalid.')
                }
                setAddress(resolvedAddress as `0x${string}`)
            } catch (err) {
                setResolveError('Failed to resolve basename to address.')
            } finally {
                setResolveLoading(false)
            }
        }

        if (basename) {
            resolveAddress()
        }
    }, [basename])

    // Handle form submission
    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!address) {
            alert('Address is not resolved yet.')
            return
        }
        const formData = new FormData(e.target as HTMLFormElement)
        const value = formData.get('value') as string

        // Validate inputs
        if (isNaN(Number(value)) || Number(value) <= 0) {
            alert('Please enter a valid amount.')
            return
        }

        // Send the transaction
        sendTransaction({ to: address, value: parseEther(value) })
    }

    return (
        <form onSubmit={submit} className='mt-10 flex flex-col space-y-4'>
            {/* Display loading state for address resolution */}
            {resolveLoading && <div className="text-gray-600">Resolving address...</div>}

            {/* Display error message if address resolution fails */}
            {resolveError && <div className="text-red-600">{resolveError}</div>}

            {/* Display the resolved address */}
            {address && (
                <div className='mt-2'>
                    <span className='block text-lg text-black font-semibold'>Resolved Address:</span>
                    <strong className='text-xl text-black break-all'>{address}</strong>
                </div>
            )}

            {/* Value Input */}
            <Input
                name="value"
                placeholder="0.05"
                required
                defaultValue={initialValue}
                type="number"
                min="0"
                step="any"
                className='text-black'
                disabled={!address || resolveLoading || !!resolveError}
            />

            {/* Submit Button */}
            <Button
                className='bg-purple-500'
                disabled={isPending || resolveLoading || !address || !!resolveError}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Send'}
            </Button>

            {/* Transaction Status Messages */}
            {hash && <div className="mt-2 text-sm text-gray-600 break-all">Transaction Hash: {hash}</div>}
            {isConfirming && <div className="mt-2 text-sm text-yellow-600">Waiting for confirmation...</div>}
            {isConfirmed && <div className="mt-2 text-sm text-green-600">Transaction confirmed.</div>}
            {error && (
                <div className="mt-2 text-sm text-red-600">
                    Error: {(error as BaseError).shortMessage || error.message}
                </div>
            )}
        </form>
    )
}