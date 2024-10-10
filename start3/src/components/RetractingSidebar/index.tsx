'use client';

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { IconType } from "react-icons";
import {
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
} from "react-icons/fi";
import {
  Address,
  Avatar,
  Identity,
  Name,
  Badge,
} from '@coinbase/onchainkit/identity';
import { motion } from "framer-motion";
import { useAccount } from 'wagmi';
import Davatar from "@davatar/react";
import { base } from "viem/chains";
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

// Main Sidebar Component
export const RetractingSide: React.FC = () => {
  return (
    <div className="flex bg-indigo-50">
      <RetractingSidebar />
    </div>
  );
};

// Sidebar Component with Redirection Logic
export const RetractingSidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Dashboard");
  const { address } = useAccount(); // Get the user's wallet address
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    if (!address) {
      router.push('/'); // Redirect to home if wallet not connected
    }
  }, [address, router]);

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiDollarSign}
          title="Builder"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        {/* Add more options as needed */}
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

// Option Component
interface OptionProps {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}

const Option: React.FC<OptionProps> = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
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

// Title Section Component
interface TitleSectionProps {
  open: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({ open }) => {
  const { address } = useAccount();

  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          {address && (
            <motion.div
              layout
              className="grid size-10 shrink-0 place-content-center rounded-md bg-[#A479FF]"
            >
              <Avatar
                address={address}
                chain={base}
                defaultComponent={
                  <Davatar
                    size={32}
                    address={address}
                    generatedAvatarType="jazzicon" // optional, 'jazzicon' or 'blockies'
                  />
                }
              />
            </motion.div>
          )}
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              {address && (
                <Identity
                  address={address}
                  chain={base}
                  className="bg-white"
                  schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                >
                  <Name className="text-xs group-hover:text-white">
                    <Badge />
                  </Name>
                  <Address className="text-xs group-hover:text-white" />
                </Identity>
              )}
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

// Toggle Close Component
interface ToggleCloseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleClose: React.FC<ToggleCloseProps> = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform text-black ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-black"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};