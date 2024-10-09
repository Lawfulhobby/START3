'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import useWallet from '@/lib/useWallet';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TokenIcon from '../TokenIcon';

const IncentiveCalculator = () => {
    const [numOfPeople, setNumOfPeople] = useState('');
    const [prizePool, setPrizePool] = useState('');
    const [incentivePerPerson, setIncentivePerPerson] = useState<number | null>(null);
    const { account, chainId } = useWallet();

    useEffect(() => {
        // Automatically calculate when the inputs change
        const people = parseFloat(numOfPeople);
        const pool = parseFloat(prizePool);

        if (!isNaN(people) && !isNaN(pool) && people > 0 && pool > 0) {
            const incentive = pool / people;
            setIncentivePerPerson(incentive);
        } else {
            setIncentivePerPerson(null); // Reset if inputs are invalid
        }
    }, [numOfPeople, prizePool]); // Run the effect whenever these values change

    return (
        <div className="max-w-md mx-auto mt-10 p-6 text-black">


            <div className="mb-4">
                <p
                    className='ml-2 text-pretty text-sm font-medium tracking-tighter'
                >Distribution Target</p>
                <input
                    type="number"
                    value={numOfPeople}
                    min={1}
                    onChange={(e) => setNumOfPeople(e.target.value)}
                    className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-2xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl"
                    placeholder="Target"
                />
            </div>

            <div className='flex items-center'>
                <div className="mb-4">
                    <p
                        className='ml-2 text-pretty text-sm font-medium tracking-tighter'
                    >Pool amount</p>
                    <input
                        type="number"
                        min={1}
                        value={prizePool}
                        onChange={(e) => setPrizePool(e.target.value)}
                        className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-2xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl"
                        placeholder="Prize pool"
                    />
                </div>

                <div >
                    {/* <p
                        className='ml-2 text-pretty text-sm font-medium tracking-tighter'
                    >Reward token</p> */}
                    <Select>
                        <SelectTrigger
                            className="w-[180px] border-none shadow-none"
                            defaultValue={"cUSD"}>
                            <SelectValue
                                className="uppercase text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl"
                                placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cUSD">
                                <TokenIcon
                                    symbol='usdc'
                                    displaySize={32}
                                />
                            </SelectItem>
                            <SelectItem value="cbETH">
                                <TokenIcon
                                    symbol='eth'
                                    displaySize={32}
                                />
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            {/* CSS to remove the number input spinner */}
            <style jsx>{`
        /* Chrome, Safari, Edge, Opera */
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>

            <p
                className='ml-2 text-pretty text-sm font-medium tracking-tighter'
            >Incentive per user</p>
            {incentivePerPerson !== null && (
                <div className="mt-2 p-4 ">
                    <p className='ml-2 text-center text-pretty text-4xl font-semibold tracking-tighter'>
                        {incentivePerPerson.toFixed(6)} ETH
                    </p>
                </div>
            )}

            {incentivePerPerson == null && (
                <Skeleton className="mt-2 p-7 " />
            )}



        </div>
    );
};

