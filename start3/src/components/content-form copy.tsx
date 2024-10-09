'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@headlessui/react'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { rewardOptions } from './builder/reward';
import { options } from './builder/tools';
import { Button } from './button';

interface Option {
    name: string;
    description: string;
}

const settings: Option[] = [
    { name: 'Preview', description: 'Preview' },
    { name: 'Testnet', description: 'Testnet' },
    { name: 'Mainnet', description: 'Mainnet' },
];

export default function ContentForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState([{ step: 1, title: '', content: '' }]);
    const [selectedRewardOption, setSelectedRewardOption] = useState(rewardOptions[0])
    const [open, setOpen] = useState(false)
    const { address } = useAccount();
    const [stepsComplete, setStepsComplete] = useState(0);

    const [selected, setSelected] = useState<Option | null>(null);
    const [dis, setDis] = useState(false); // Added: state to disable the RadioGroup

    const numSteps = 3;

    const router = useRouter(); // For navigation after form submission

    const handleSetStep = (num: -1 | 1) => {
        if (
            (stepsComplete === 0 && num === -1) ||
            (stepsComplete === numSteps && num === 1)
        ) {
            return;
        }

        setStepsComplete((pv) => pv + num);
    };

    const addStep = () => {
        setSteps([...steps, { step: steps.length + 1, title: '', content: '' }]);
    };

    const handleStepChange = (index: number, field: string, value: string) => {
        console.log(value)
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const contentData = {
            name,
            description,
            rewardInstructions: selectedRewardOption.action,
            steps,
            address,
        };

        console.log(contentData)
        try {
            const response = await fetch('/api/POST/createForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contentData),
            });

            if (response.ok) {
                const responseData = await response.json();
                const contentId = responseData.id; // Extract the content id
                alert(`Content created successfully with ID: ${contentId}`);
                // router.push(`/flow/${contentId}`); // Navigate to the home page after successful submission
            } else {
                alert('Failed to create content');
            }
        } catch (error) {
            console.error('Error creating content:', error);
        }
    };

    return (
        <div className=" mx-auto text-black ">
            <form onSubmit={handleSubmit}>
                <div className="  flex w-full  ">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl"
                        placeholder="Name your flow!"
                        spellCheck={false}
                        required
                    />
                </div>
                <div className="mb-4">

                </div>
                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-xl"
                        placeholder='Give it a description'
                        required
                    />
                </div>

                <div className='flex gap-4 justify-left items-center'>
                    <h2 className="text-xl  ml-2">Questions</h2>
                    <button
                        type="button"
                        onClick={addStep}
                        className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center justify-center text-center hover:bg-black hover:text-white"
                    >
                        <PlusIcon className='h-4 w-4 font-bold' />
                        <p className='uppercase text-xs font-bold'>Add Question</p>
                    </button>
                </div>


                {steps.map((step, index) => {
                    // Find the selected option based on step.content
                    const selectedOption = options.find(option => option.content === step.content);
                    return (
                        <div key={index} className="mb-2 flex w-full justify-between">
                            <div className="mb-2 w-10/12">
                                <input
                                    type="text"
                                    value={step.title}
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                    className="focus:border-none focus:outline-none rounded p-2 w-full text-pretty text-lg font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-xl"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <fieldset>
                                    <RadioGroup
                                        value={step.content}
                                        onChange={(value) => handleStepChange(index, 'content', value)}
                                        className="flex items-center space-x-3">
                                        <Sheet key={'left'}>
                                            <SheetTrigger
                                                className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center justify-center text-center hover:bg-black hover:text-white"
                                            >
                                                {selectedOption ? selectedOption.name : 'Select an option'}
                                            </SheetTrigger>
                                            <SheetContent className='bg-white text-black' side={'left'}>
                                                <SheetHeader className='mb-5'>
                                                    <SheetTitle>UI Toolbox</SheetTitle>
                                                </SheetHeader>
                                                <div className='flex grid grid-cols-3'>
                                                    {options.map((option) => (
                                                        <div key={option.content} className='flex flex-col items-center'>
                                                            <Radio
                                                                value={option.content}
                                                                aria-label={option.name}
                                                                className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-[#A479FF] data-[focus]:ring-2 data-[focus]:ring-[#A479FF] group-data-[checked]:bg-[#A479FF]"
                                                            >
                                                                <div className="text-2xl text-black transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                                                                    {option.graphic}
                                                                </div>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-[#A479FF]"
                                                                />
                                                            </Radio>
                                                            <p className="block text-sm font-medium text-gray-900 mb-2">
                                                                {option.name}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                    </RadioGroup>
                                </fieldset>
                            </div>
                        </div>
                    )
                })}

                <fieldset>
                    <RadioGroup
                        value={selectedRewardOption}
                        onChange={setSelectedRewardOption}
                        className="mt-6  grid grid-cols-1 gap-y-6 sm:grid-cols-7 sm:gap-x-4"
                    >
                        {rewardOptions.map((rewardOption) => (
                            <Radio
                                key={rewardOption.id}
                                value={rewardOption}
                                aria-label={rewardOption.title}
                                aria-description={`${rewardOption.description} to ${rewardOption.users}`}
                                className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-[#A479FF] data-[focus]:ring-2 data-[focus]:ring-[#A479FF] group-data-[checked]:bg-[#A479FF]"
                            >
                                <div className="text-2xl text-black transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                                    {rewardOption.graphic}
                                </div>
                                <span className="flex mt-4">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-gray-900">{rewardOption.title}</span>
                                    </span>
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-[#A479FF]"
                                />
                            </Radio>
                        ))}
                    </RadioGroup>
                </fieldset>


                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Preview {selected && <>{selected.name}</>}
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to deactivate your account? All of your data will be permanently removed from
                                                our servers forever. This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <fieldset aria-label="Select an option">
                                        <RadioGroup
                                            value={selected}
                                            onChange={setSelected}
                                            className="space-y-1 rounded-md "
                                            disabled={dis} // Disable RadioGroup when `dis` is true
                                        >
                                            {settings.map((setting, settingIdx) => (
                                                <RadioGroup.Option
                                                    key={setting.name}
                                                    value={setting}
                                                    className="group relative block cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm focus:outline-none data-[focus]:border-[#A479FF] data-[focus]:ring-2 data-[focus]:ring-indigo-600 sm:flex sm:justify-between"
                                                >
                                                    {({ checked }) => (
                                                        <>
                                                            <span className="ml-3 flex flex-col">
                                                                <span className={cn('block text-sm font-medium text-gray-900', checked ? 'text-[#A479FF]' : 'text-black')}>
                                                                    {setting.name}
                                                                </span>
                                                            </span>
                                                            <span
                                                                aria-hidden="true"
                                                                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-[#A479FF]"
                                                            />
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>
                            </DialogPanel>
                        </div>

                    </div>
                </Dialog>

                <div className='mt-5'>
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-[#A479FF] w-[250px] h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300  "
                    >
                        Generate flow
                    </button>
                </div>

                <div className='mt-5'>
                    <button
                        type="submit"
                        className="bg-[#A479FF] w-[250px] h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300  "
                    >
                        Generate flow
                    </button>
                </div>

            </form>
        </div>
    );
}


{/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
{selected && selected?.name == "Preview" &&
<Button
    type="submit"
    // onClick={() => setOpen(false)}
    className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
>
    Continue
</Button>
}

{selected && selected?.name == "Testnet" &&
    <Button
        type="button"
        onClick={() => setOpen(false)}
        className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    >
        Continue
    </Button>
}

{selected && selected?.name == "Mainnet" &&
    <Button
        type="button"
        onClick={() => setOpen(false)}
        className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    >
        Continue
    </Button>
}

{!selected &&
    <Button
        disabled
        type="button"
        onClick={() => setOpen(false)}
        className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    >
        Continue
    </Button>
}


<Button
    type="button"
    onClick={() => setOpen(false)}
    className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
>
    Cancel
</Button>
</div> */}