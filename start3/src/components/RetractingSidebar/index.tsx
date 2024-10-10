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

export const RetractingSide = () => {
  return (
    <div className="flex bg-indigo-50">
      <RetractingSidebar/>
      {/* <ExampleContent /> */}
    </div>
  );
};

export const RetractingSidebar = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

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
        {/* <Option
          Icon={FiMonitor}
          title="View Site"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiShoppingCart}
          title="Products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiTag}
          title="Tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiBarChart}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiUsers}
          title="Members"
          selected={selected}
          setSelected={setSelected}
          open={open}
        /> */}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
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
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        {/* <Icon /> */}
        <svg width="30" height="30" viewBox="0 0 95 124" fill="#1A1A1A" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M75.0699 50.5V78.84L65.6599 74.14L55.6699 69.14V61.7L72.71 51.86L75.0699 50.5Z" stroke="white" strokeLinejoin="round"/><path d="M85.6594 36.29L92.7095 32.22V24.12L85.6594 28.1899V12L77.6794 16.61L72.7095 19.48L55.0695 29.66L35.6694 40.86L32.1394 42.9L22.1494 48.6699V121.54L85.6594 84.87V68.6799L92.7095 64.6V56.51L85.6594 60.58V52.48L92.7095 48.41V40.3099L85.6594 44.39V36.29ZM52.1394 92.08L32.7295 103.28V87.09L37.1094 84.5599L52.1394 75.88V92.08ZM52.1394 71.84L33.3495 82.6799L32.7295 83.04V54.7L35.6694 53L52.1394 43.5V71.84ZM75.0695 78.84L55.6694 90.04V61.7L72.7095 51.86L75.0695 50.5V78.84ZM75.0695 46.45L73.9194 47.11L72.7095 47.8099L55.6694 57.65V41.46L60.0394 38.9399L72.7095 31.62L73.9294 30.9199L75.0695 30.26V46.45Z" stroke="white" strokeLinejoin="round"/><path d="M75.0699 78.8401L55.6699 90.0402V69.1401L65.6599 74.1401L75.0699 78.8401Z" stroke="white" strokeLinejoin="round"/><path d="M75.0691 30.26V46.45L66.3391 42.09L60.0391 38.9399L72.7091 31.62L73.9291 30.9199L75.0691 30.26Z" stroke="white" strokeLinejoin="round"/><path d="M75.0699 46.45L73.9199 47.11L72.71 47.8099L55.6699 57.65V41.46L60.0399 38.9399L66.34 42.09L75.0699 46.45Z" stroke="white" strokeLinejoin="round"/><path d="M52.1394 43.5V71.84L50.9294 71.23L35.6694 63.61L32.7295 62.14V54.7L35.6694 53L52.1394 43.5Z" stroke="white" strokeLinejoin="round"/><path d="M52.1394 71.8401L33.3495 82.6801L32.7295 83.0402V62.1401L35.6694 63.6101L50.9294 71.2301L52.1394 71.8401Z" stroke="white" strokeLinejoin="round"/><path d="M52.1394 75.8799V92.0798L43.4094 87.7198L37.1094 84.5598L52.1394 75.8799Z" stroke="white" strokeLinejoin="round"/><path d="M52.1394 92.0801L32.7295 103.28V87.0901L37.1094 84.5601L43.4094 87.7201L52.1394 92.0801Z" stroke="white" strokeLinejoin="round"/><path d="M85.6594 12L77.6794 16.61L72.7095 19.48L55.0695 29.66L35.6694 40.86L32.1394 42.9L22.1494 48.6699L13.4194 44.2999L2.14941 38.6699L65.6594 2L85.6594 12Z" stroke="white" strokeLinejoin="round"/><path d="M22.1494 48.6699V121.54L2.14941 111.54V38.6699L13.4194 44.2999L22.1494 48.6699Z" stroke="white" strokeLinejoin="round"/><path d="M92.7092 24.1201L85.6592 20.6001" stroke="white" strokeLinejoin="round"/><path d="M92.7092 40.3099L85.6592 44.39V36.79L92.7092 40.3099Z" stroke="white" strokeLinejoin="round"/><path d="M92.7092 56.51L85.6592 60.58V52.99L92.7092 56.51Z" stroke="white" strokeLinejoin="round"/></svg>
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
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">TomIsLoading</span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )}
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
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
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
      onClick={() => setOpen((pv) => !pv)}
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
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

// const ExampleContent = () => <div className="h-[200vh] w-full"></div>;