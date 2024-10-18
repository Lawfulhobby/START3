// @ts-nocheck
'use client';

import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import useWallet from '@/lib/useWallet';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TokenIcon from '../TokenIcon';
import { Button } from '../button';
import { CONTEXT } from "../../apis/context_provider";
import { useToast } from '@/hooks/use-toast';


export const IncentiveCalculator = () => {
    const [numOfPeople, setNumOfPeople] = useState('');
    const [prizePool, setPrizePool] = useState('');
    const [incentivePerPerson, setIncentivePerPerson] = useState<number | null>(null);
    const { account } = useWallet();
    const { toast } = useToast()

    const {
        TRANSFER_FUNDS,
        SET_AIRDROP_AMOUNT,
    } = useContext(CONTEXT);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleDepositAndAirdrop = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Transfer Funds
            await TRANSFER_FUNDS(Number(prizePool));

            // Set Airdrop Amount if incentivePerPerson is valid
            if (incentivePerPerson !== null) {
                await SET_AIRDROP_AMOUNT(Number(incentivePerPerson));
            } else {
                throw new Error('Invalid incentive per person.');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" text-black ">

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
                <div className="mb-4 flex-1">
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

                <div className="ml-4">
                    <Select>
                        <SelectTrigger
                            className="w-[135px] border-none shadow-none"
                            defaultValue={"STRT"}>
                            <SelectValue
                                className="uppercase text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl"
                                placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="STRT">
                                <TokenIcon
                                    symbol='strt'
                                    displaySize={32}
                                />
                            </SelectItem>
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
                        {incentivePerPerson.toFixed(6)} STRT
                    </p>
                </div>
            )}

            {incentivePerPerson == null && (
                <Skeleton className="mt-2 p-7 " />
            )}

            {error && (
                <div className="mt-2 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <Button
                className='flex bg-black w-full mt-4 disabled:opacity-50'
                onClick={handleDepositAndAirdrop}
                disabled={isLoading || incentivePerPerson === null || !prizePool || !numOfPeople}
            >
                {isLoading ? 'Processing...' : 'Transact'}
            </Button>
        </div>
    );
};