'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useAccount } from 'wagmi';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { rewardOptions } from './builder/reward';
import { options } from './builder/tools';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useQRCode } from 'next-qrcode'

import { Copy } from "lucide-react"

import { Button } from './button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Link from 'next/link';

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
    const [selectedRewardOption, setSelectedRewardOption] = useState(rewardOptions[0]);
    const [open, setOpen] = useState(false);
    const { address } = useAccount();
    const [selected, setSelected] = useState<Option | null>(null);
    const [dis, setDis] = useState(false);
    const [qrUrl, setQrUrl] = useState('');

    const { SVG } = useQRCode()

    const router = useRouter();

    const addStep = () => {
        setSteps([...steps, { step: steps.length + 1, title: '', content: '' }]);
    };

    const handleStepChange = (index: number, field: string, value: string) => {
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };

    const handleSubmit = async () => {
        const contentData = {
            name,
            description,
            rewardInstructions: selectedRewardOption.action,
            steps,
            address,
        };

        console.log(contentData);
        try {
            const response = await fetch('/api/POST/createForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contentData),
            });

            if (response.ok) {
                const responseData = await response.json();
                const contentId = responseData.id;
                // alert(`Content created successfully with ID: ${contentId}`);
                // router.push(`/flow/${contentId}`);
                setQrUrl(`http://localhost:3000/flow/${contentId}`);
            } else {
                alert('Failed to create content');
            }
        } catch (error) {
            console.error('Error creating content:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrUrl);
        alert('Link copied to clipboard!');
      };

    return (
        <div className="mx-auto text-black">
            {/* Removed onSubmit from form */}
            <form>
                <div className="flex w-full">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="focus:outline-none rounded p-2 w-full text-4xl font-medium tracking-tighter text-gray-950 sm:text-6xl"
                        placeholder="Name your flow!"
                        spellCheck={false}
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="focus:outline-none rounded p-2 w-full text-lg font-medium tracking-tighter text-gray-950 sm:text-xl"
                        placeholder="Give it a description"
                        required
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <h2 className="text-xl ml-2">Questions</h2>
                    <button
                        type="button"
                        onClick={addStep}
                        className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center hover:bg-black hover:text-white"
                    >
                        <PlusIcon className="h-4 w-4 font-bold" />
                        <p className="uppercase text-xs font-bold">Add Question</p>
                    </button>
                </div>

                {steps.map((step, index) => {
                    const selectedOption = options.find(option => option.content === step.content);
                    return (
                        <div key={index} className="mb-2 flex w-full justify-between">
                            <div className="mb-2 w-10/12">
                                <input
                                    type="text"
                                    value={step.title}
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                    className="focus:outline-none rounded p-2 w-full text-lg font-medium tracking-tighter text-gray-950 sm:text-xl"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <fieldset>
                                    <RadioGroup
                                        value={step.content}
                                        onChange={(value) => handleStepChange(index, 'content', value)}
                                        className="flex items-center space-x-3"
                                    >
                                        <Sheet>
                                            <SheetTrigger className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center hover:bg-black hover:text-white">
                                                {selectedOption ? selectedOption.name : 'Select an option'}
                                            </SheetTrigger>
                                            <SheetContent className="bg-white text-black">
                                                <SheetHeader className="mb-5">
                                                    <SheetTitle>UI Toolbox</SheetTitle>
                                                </SheetHeader>
                                                <div className="grid grid-cols-3">
                                                    {options.map((option) => (
                                                        <div key={option.content} className="flex flex-col items-center">
                                                            <Radio
                                                                value={option.content}
                                                                aria-label={option.name}
                                                                className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none group-data-[checked]:bg-[#A479FF]"
                                                            >
                                                                <div className="text-2xl text-black transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                                                                    {option.graphic}
                                                                </div>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[checked]:border-[#A479FF]"
                                                                />
                                                            </Radio>
                                                            <p className="text-sm font-medium text-gray-900 mb-2">
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
                    );
                })}

                <fieldset>
                    <RadioGroup
                        value={selectedRewardOption}
                        onChange={setSelectedRewardOption}
                        className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-7 sm:gap-x-4"
                    >
                        {rewardOptions.map((rewardOption) => (
                            <Radio
                                key={rewardOption.id}
                                value={rewardOption}
                                aria-label={rewardOption.title}
                                className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none group-data-[checked]:bg-[#A479FF]"
                            >
                                <div className="text-2xl text-black transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                                    {rewardOption.graphic}
                                </div>
                                <span className="flex mt-4">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-gray-900">
                                            {rewardOption.title}
                                        </span>
                                    </span>
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[checked]:border-[#A479FF]"
                                />
                            </Radio>
                        ))}
                    </RadioGroup>
                </fieldset>
            </form>

            <Sheet>
                {/* <div className='relative flex w-full bg-black items-end'>
                    <SheetTrigger className="bg-white absolute right-0 justify-between mt-10 w-[250px] text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center hover:bg-black hover:text-white">
                        <p>Generate flow</p>
                        <ArrowRight className='h-4 w-4' />
                    </SheetTrigger>
                </div> */}

                <SheetContent className="bg-white text-black">
                    <SheetHeader className="mb-5">
                        <SheetTitle></SheetTitle>
                    </SheetHeader>
                    <div className="grid ">
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
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#A479FF] mt-4 w-[250px] h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                        >
                            Generate flow
                        </button>
                    </div>
                </SheetContent>
            </Sheet>

            <Dialog>
                <DialogTrigger asChild className='relative flex bg-black items-end  w-[250px] '>
                    <Button className="bg-black absolute justify-between mt-10 w-[250px] text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center hover:bg-black hover:text-white">
                        <p>Generate flow</p>
                        <ArrowRight className='h-4 w-4' />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid ">
                            {qrUrl &&
                                <div className='text-center items-center flex flex-col'>
                                    <SVG
                                        text={qrUrl}
                                        options={{
                                            margin: 2,
                                            width: 150,
                                            color: {
                                                dark: '#A479FF',
                                                light: '#FFFFFF',
                                            },
                                        }}
                                    />

                                    <div className="flex items-center space-x-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="link" className="sr-only">
                                                Link
                                            </Label>
                                            <Input
                                                id="link"
                                                className='text-black/60'
                                                defaultValue={qrUrl}
                                                readOnly
                                            />
                                        </div>
                                        <Button onClick={handleCopy} className="px-3" >
                                            <span className="sr-only">Copy</span>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <Link href={qrUrl} className='mt-2 text-[#A479FF]'>
                                        Link to flow
                                    </Link>
                                </div>
                            }
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
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                            >
                                Generate flow
                            </button>
                        </div>
                    </div>
                    <DialogFooter>
                        {/* <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}