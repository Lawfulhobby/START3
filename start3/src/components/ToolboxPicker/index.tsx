import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";
import ContentForm from "../content-form";
import { Container } from "../container";
import { MotionConfig } from "framer-motion";

import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useAccount } from 'wagmi';
import { FiArrowRight } from "react-icons/fi";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { rewardOptions } from "../builder/reward";
import { options } from "../builder/tools";
import { ArrowRight, LinkIcon, SquareArrowOutDownRightIcon, SquareArrowOutUpRight, SquareArrowUpRight } from 'lucide-react';
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

import {
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'

import { useQRCode } from 'next-qrcode'

import { Copy } from "lucide-react"

import { Button } from "../button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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

export const ToolboxPicker = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState([{ step: 1, title: '', content: '' }]);
  const [selectedRewardOption, setSelectedRewardOption] = useState(rewardOptions[0]);
  const { address } = useAccount();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [dis, setDis] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [stepsComplete, setStepsComplete] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null); // New state for active step

  const { SVG } = useQRCode()

  const router = useRouter();

  const numSteps = 3;

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

    console.log("Content Data", contentData);
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
        setStepsComplete((pv) => pv + 1);
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

  const renderProcess = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="overflow-hidden">
              <fieldset aria-label="Select an option">
                <RadioGroup
                  value={selectedOption}
                  onChange={setSelectedOption}
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
          </>
        );
      case 1:
        return (
          <>
            <div className="overflow-hidden">
              {qrUrl &&
                <div className='text-center items-center flex flex-col'>
                  <div className='border rounded border-[#A479FF] p-2'>
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
                  </div>


                  <div className="flex items-center space-x-2 mt-2">
                    <div className="grid flex-1 gap-2">
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

                    <Link href={qrUrl} className='text-[#A479FF]'>
                      <Button>
                        <SquareArrowOutUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <TwitterShareButton
                    url={'https://start3.com/your-flow-link'}
                    title={'I just completed my Web3 onboarding flow on Start3! Join me and get started with your own personalized Web3 journey 🚀'}
                    hashtags={['Web3', 'Blockchain', 'Start3', 'Crypto']}
                    via={'Start3Platform'}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              }
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="overflow-hidden bg-neutral-50 py-12 sm:py-8">
              <div className="mx-auto max-w-7xl md:px-6 lg:px-6">

              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex">
      <>
        <motion.nav
          layout
          className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
          style={{
            width: open ? "300px" : "fit-content",
          }}
        >
          <TitleSection open={open} />

          <div className="space-y-1">
            {/* <p className="text-black text-medium">Toolbox</p> */}
            {activeStep === null && (
              <>
                <SpringCard
                  title="UI Toolbox"
                  subtitle="The UI Toolbox in Start3 is a powerful set of components designed to help users easily build and customize their Web3 onboarding flows."
                  className="bg-indigo-300"

                />
              </>
            )
            }
            {/* 
              Render toolbox options based on activeStep.
              If no step is active, you can choose to render nothing or a default message.
            */}
            {activeStep !== null && steps[activeStep] && (
              <div
                key={activeStep}
                className="mb-2 flex flex-col w-full justify-between"
              >
                <p className="focus:outline-none rounded p-2 w-full text-4xl font-medium tracking-tighter text-gray-950 sm:text-2xl">Question {activeStep + 1}</p>
                <fieldset>
                  <RadioGroup
                    value={steps[activeStep].content}
                    onChange={(value) => handleStepChange(activeStep, 'content', value)}
                    className="flex flex-col items-center"
                  >

                    {/* <div className="grid grid-cols-3"> */}
                    {options.map((option) => (
                      <div key={option.content} className="flex items-center w-full mt-2">
                        <Radio
                          value={option.content}
                          aria-label={option.name}
                          className="group relative p-3 items-center gap-2 flex w-full cursor-pointer rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none group-data-[checked]:bg-[#A479FF]"
                        >
                          <div className="text-gray-400 transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                            {option.graphic}
                          </div>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[checked]:border-[#A479FF]"
                          />
                          <p className="text-xl text-gray-400 font-medium tracking-tighter transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                            {option.name}
                          </p>
                        </Radio>
                      </div>
                    ))}
                    {/* </div> */}
                  </RadioGroup>
                </fieldset>
              </div>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild className='flex  '>
              <motion.button
                layout
                //   onClick={''}
                className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
              >
                <div className="flex items-center p-2">
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-xl size-10 text-black items-center justify-center font-medium"
                  >
                    Publish
                  </motion.span>
                </div>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <div className="grid gap-4 py-4">
                <div className="grid ">

                  {renderProcess(stepsComplete)}

                  {!selectedOption?.name &&
                    <>
                      <button
                        type="button"
                        disabled
                        onClick={handleSubmit}
                        className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                      >
                        Next
                      </button>
                    </>
                  }
                  {!qrUrl &&
                    <>
                      {selectedOption?.name == "Preview" &&
                        <>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                          >
                            Next
                          </button>
                        </>
                      }
                      {selectedOption?.name == "Testnet" &&
                        <>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                          >
                            Next
                          </button>
                        </>
                      }
                      {selectedOption?.name == "Mainnet" &&
                        <>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                          >
                            Next
                          </button>
                        </>
                      }
                    </>
                  }
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.nav>
      </>
      <div className="">
        <Container className="mt-3">
          <div className="relative isolate overflow-hidden  ">
            <>
              <div className="mx-auto text-black">
                <form>
                  <div className="relative flex bg-black w-full">
                    <Dialog>
                      <DialogTrigger asChild className='flex bg-black w-[250px] '>
                        Ge
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-white">
                        <div className="grid gap-4 py-4">
                          <div className="grid ">

                            {renderProcess(stepsComplete)}

                            {!selectedOption?.name &&
                              <>
                                <button
                                  type="button"
                                  disabled
                                  onClick={handleSubmit}
                                  className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                                >
                                  Next
                                </button>
                              </>
                            }
                            {!qrUrl &&
                              <>
                                {selectedOption?.name == "Preview" &&
                                  <>
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                                    >
                                      Next
                                    </button>
                                  </>
                                }
                                {selectedOption?.name == "Testnet" &&
                                  <>
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                                    >
                                      Next
                                    </button>
                                  </>
                                }
                                {selectedOption?.name == "Mainnet" &&
                                  <>
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="bg-[#A479FF] mt-4 w-full h-12 rounded-full text-white py-2 px-4 hover:bg-[#8e56d4] transition-colors duration-300"
                                    >
                                      Next
                                    </button>
                                  </>
                                }
                              </>
                            }
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
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
                  </div>

                  {steps.map((step, index) => {
                    const selectedOption = options.find(option => option.content === step.content);
                    return (
                      <div key={index}
                        className="mb-2 flex flex-col w-full justify-between mt-2"
                      >
                        <div className="mb-2 w-10/12">
                          <input
                            type="text"
                            value={step.title}
                            placeholder={`Question ${index + 1}`}
                            onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                            onFocus={() => setActiveStep(index)} // Set activeStep on focus
                            className="focus:outline-none rounded p-2 w-full text-lg font-medium tracking-tighter text-gray-950 sm:text-xl"
                            required
                          />
                        </div>
                        {/* Optional: Display selected option for each step */}
                        {selectedOption && (
                          <p className="text-xs ml-2 text-gray-600">Selected Option: {selectedOption.name}</p>
                        )}
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={addStep}
                    className="bg-white text-[#A479FF] border border-[#A479FF] rounded-full flex py-2 px-3 items-center hover:bg-black hover:text-white"
                  >
                    <PlusIcon className="h-4 w-4 font-bold" />
                    <p className="uppercase text-xs font-bold">Add Question</p>
                  </button>
                  <fieldset>
                    <RadioGroup
                      value={selectedRewardOption}
                      onChange={setSelectedRewardOption}
                      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4"
                    >
                      {rewardOptions.map((rewardOption) => (
                        <Radio
                          key={rewardOption.id}
                          value={rewardOption}
                          aria-label={rewardOption.title}
                          className="group relative flex flex-col cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none group-data-[checked]:bg-[#A479FF]"
                        >
                          <div className="text-2xl text-gray-400 transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
                            {rewardOption.graphic}
                          </div>
                          <span className="flex mt-4">
                            <span className="flex flex-col">
                              <span className="text-xl text-gray-400 font-medium tracking-tighter transition-colors duration-500 group-hover:text-[#A479FF] group-data-[checked]:text-[#A479FF]">
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

              </div>
            </>
          </div>
        </Container>
      </div>
    </div>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-[#A479FF] text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        {/* <Icon /> */}
        <svg width="30" height="30" viewBox="0 0 95 124" fill="#1A1A1A" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M75.0699 50.5V78.84L65.6599 74.14L55.6699 69.14V61.7L72.71 51.86L75.0699 50.5Z" stroke="white" strokeLinejoin="round" /><path d="M85.6594 36.29L92.7095 32.22V24.12L85.6594 28.1899V12L77.6794 16.61L72.7095 19.48L55.0695 29.66L35.6694 40.86L32.1394 42.9L22.1494 48.6699V121.54L85.6594 84.87V68.6799L92.7095 64.6V56.51L85.6594 60.58V52.48L92.7095 48.41V40.3099L85.6594 44.39V36.29ZM52.1394 92.08L32.7295 103.28V87.09L37.1094 84.5599L52.1394 75.88V92.08ZM52.1394 71.84L33.3495 82.6799L32.7295 83.04V54.7L35.6694 53L52.1394 43.5V71.84ZM75.0695 78.84L55.6694 90.04V61.7L72.7095 51.86L75.0695 50.5V78.84ZM75.0695 46.45L73.9194 47.11L72.7095 47.8099L55.6694 57.65V41.46L60.0394 38.9399L72.7095 31.62L73.9294 30.9199L75.0695 30.26V46.45Z" stroke="white" strokeLinejoin="round" /><path d="M75.0699 78.8401L55.6699 90.0402V69.1401L65.6599 74.1401L75.0699 78.8401Z" stroke="white" strokeLinejoin="round" /><path d="M75.0691 30.26V46.45L66.3391 42.09L60.0391 38.9399L72.7091 31.62L73.9291 30.9199L75.0691 30.26Z" stroke="white" strokeLinejoin="round" /><path d="M75.0699 46.45L73.9199 47.11L72.71 47.8099L55.6699 57.65V41.46L60.0399 38.9399L66.34 42.09L75.0699 46.45Z" stroke="white" strokeLinejoin="round" /><path d="M52.1394 43.5V71.84L50.9294 71.23L35.6694 63.61L32.7295 62.14V54.7L35.6694 53L52.1394 43.5Z" stroke="white" strokeLinejoin="round" /><path d="M52.1394 71.8401L33.3495 82.6801L32.7295 83.0402V62.1401L35.6694 63.6101L50.9294 71.2301L52.1394 71.8401Z" stroke="white" strokeLinejoin="round" /><path d="M52.1394 75.8799V92.0798L43.4094 87.7198L37.1094 84.5598L52.1394 75.8799Z" stroke="white" strokeLinejoin="round" /><path d="M52.1394 92.0801L32.7295 103.28V87.0901L37.1094 84.5601L43.4094 87.7201L52.1394 92.0801Z" stroke="white" strokeLinejoin="round" /><path d="M85.6594 12L77.6794 16.61L72.7095 19.48L55.0695 29.66L35.6694 40.86L32.1394 42.9L22.1494 48.6699L13.4194 44.2999L2.14941 38.6699L65.6594 2L85.6594 12Z" stroke="white" strokeLinejoin="round" /><path d="M22.1494 48.6699V121.54L2.14941 111.54V38.6699L13.4194 44.2999L22.1494 48.6699Z" stroke="white" strokeLinejoin="round" /><path d="M92.7092 24.1201L85.6592 20.6001" stroke="white" strokeLinejoin="round" /><path d="M92.7092 40.3099L85.6592 44.39V36.79L92.7092 40.3099Z" stroke="white" strokeLinejoin="round" /><path d="M92.7092 56.51L85.6592 60.58V52.99L92.7092 56.51Z" stroke="white" strokeLinejoin="round" /></svg>
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {/* {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs text-black font-semibold">TomIsLoading</span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )} */}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 w-full place-content-center rounded-full px-3 bg-[#A479FF]"
    >
      {/* <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg> */}
      Flow Builder
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      //   onClick={''}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs size-10 text-black font-medium"
        >
          Publish
        </motion.span>
      </div>
    </motion.button>
  );
};


const SpringCard = ({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) => {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
    >
      <motion.div
        whileHover="hovered"
        className={cn(
          "group w-full text-black border-1 border-black bg-emerald-300",
          className
        )}
      >
        <motion.div
          className={cn(
            "-m-0.5 border-1 border-black bg-emerald-300",
            className
          )}
        >
          <motion.div
            className={cn(
              "relative -m-0.5 flex h-72 flex-col justify-between overflow-hidden border border-black bg-emerald-300 p-8",
              className
            )}
          >
            <p className="flex items-center text-2xl font-medium uppercase">
              <FiArrowRight className="-ml-8 mr-2 opacity-0 transition-all duration-300 ease-in-out group-hover:ml-0 group-hover:opacity-100" />
              {title}
            </p>
            <div>
              <p className="transition-[margin] duration-300 ease-in-out group-hover:mb-10">
                {subtitle}
              </p>
              <Link href={"/gallery"}>
                <button className="absolute bottom-2 left-2 right-2 translate-y-full border-2 border-black bg-white px-4 py-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Gallery
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>

  );
};