// @ts-nocheck
import React from "react";
import { FiBookOpen, FiEye, FiWatch } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { useAccount } from "wagmi"; // Import useAccount

export const GridCardSamples = () => {
    const { isConnected } = useAccount(); // Get connection status

    return (
        <div className="bg-background text-foreground ">
            <div className="mx-auto grid  grid-cols-1 divide-y divide-neutral-700 border border-neutral-700 md:grid-cols-4 md:divide-x md:divide-y-0">
                <Card
                    href="/marketing"
                    title="Setting up your wallet"
                    readTime="Live"
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Guide users through the process of creating and securing their first crypto wallet using interactive AI assistance."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="/create-transaction"
                    title="Send Transactions"
                    readTime="Live"
                    src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Experience personalized learning paths that adjust content based on your responses to enhance your understanding of web3."
                    disabled={!isConnected} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="Simulated Smart Contract Interactions"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Practice safe and risk-free transactions with simulated smart contract interactions to build your confidence in handling real assets."
                    disabled={true} // Pass disabled prop
                />
                <Card
                    href="#"
                    title="Simulated Smart Contract Interactions"
                    readTime="Coming soon"
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    description="Practice safe and risk-free transactions with simulated smart contract interactions to build your confidence in handling real assets."
                    disabled={true} // Pass disabled prop
                />
            </div>
        </div>
    );
};

const Card = ({
    href,
    title,
    readTime,
    src,
    disabled, // Accept disabled prop
}: {
    href: string;
    title: string;
    readTime: string;
    src: string;
    disabled?: boolean; // Define disabled as optional
}) => {
    return (
        <a
            href={disabled ? "#" : href} // Prevent navigation if disabled
            className={`group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors md:h-50 md:p-9 
                ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none " : "hover:bg-neutral-950"}`}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault(); // Prevent navigation if disabled
                }
            }}
        >
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-primary transition-colors duration-500 group-hover:text-neutral-50">
                <span>{readTime}</span>
            </div>
            <h2 className="relative  z-10 text-3xl text-primary group-hover:text-neutral-50 leading-tight transition-transform duration-500 group-hover:-translate-y-3">
                {title}
            </h2>

            <FiEye className="absolute right-3 top-4 z-10 text-2xl text-primary transition-colors group-hover:text-neutral-50" />

            <div
                className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Corners />
        </a>
    );
};

const Corners = () => (
    <>
        <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-[#7C00FF] transition-all duration-500 group-hover:scale-100" />
    </>
);

const TitleCard = () => {
    return (
        <a
            href="/create-flow"
            className="group relative flex h-56 flex-col justify-between bg-neutral-950 p-6 md:h-50 md:p-9 transition-all duration-500 ease-in-out rounded-none hover:rounded-lg"
        >

            <h2 className="absolute bottom-10 text-4xl uppercase leading-tight">
                <span className="text-neutral-400 transition-colors duration-500 group-hover:text-[#A479FF]">
                    Create
                </span>
                <br />
                Your flow
            </h2>
            <div className="absolute right-3 top-4 text-2xl text-white transition-colors duration-500 group-hover:text-[#7C00FF]">
                <svg width="50" height="50" viewBox="0 0 71 127" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M36.3499 68.8701C37.4699 68.2201 38.53 67.5301 39.51 66.7901C40.01 66.4301 40.4799 66.0501 40.9399 65.6601C42.0899 64.7101 43.1198 63.7101 44.0698 62.6501C46.1198 60.3201 47.5298 56.9401 48.2798 52.5001C48.4598 51.4101 48.6 50.2501 48.7 49.0301C48.85 47.3901 48.9199 45.6401 48.9199 43.7701V39.9201L42.22 36.05V39.9001C42.22 40.6001 42.2099 41.2501 42.1799 41.8501C42.1599 42.4401 42.1198 43.0401 42.0598 43.6501L29.21 36.2301L27.8499 35.4401L8.86987 24.4901C8.81987 23.8201 8.78 23.1701 8.75 22.5401C8.71 21.9201 8.69995 21.25 8.69995 20.55V16.7001L2 12.8301V16.6701C2 25.5901 3.61985 33.7501 6.84985 41.1701C10.0999 48.5801 14.5698 56.7601 20.2698 65.6901C14.5698 68.0401 10.0999 71.0501 6.84985 74.7301C3.61985 78.4001 2 84.6901 2 93.6101V97.4501L8.65991 101.3L8.69995 101.32V97.4801C8.69995 96.7701 8.71 96.1201 8.75 95.5301C8.78 94.9401 8.81987 94.3401 8.86987 93.7301L15.8499 97.7501L42.0598 112.89C42.1198 113.56 42.1599 114.21 42.1799 114.83C42.2099 115.46 42.22 116.12 42.22 116.83V120.68L48.9199 124.55V120.7C48.9199 111.79 47.3098 103.63 44.0698 96.2101C43.3498 94.5601 42.57 92.8801 41.71 91.1501C39.98 87.5901 37.98 83.8701 35.72 79.9901C34.48 77.8701 33.1698 75.6901 31.7798 73.4701C31.4098 72.8801 31.0399 72.2901 30.6599 71.6901C32.7099 70.8401 34.5999 69.9001 36.3499 68.8801V68.8701ZM11.6699 37.7901C11.1399 36.2401 10.66 34.6201 10.21 32.9601L20.6899 39.0101L35.1899 47.3801L40.71 50.5701C40.27 51.7801 39.79 52.8501 39.25 53.7601C39.21 53.8101 39.1799 53.8701 39.1399 53.9201C38.6399 54.7701 38.0599 55.5801 37.3699 56.3301L13.5698 42.5801C12.8398 40.9501 12.1999 39.3501 11.6699 37.7901ZM37.3699 94.7901C38.0999 96.4301 38.71 98.0201 39.25 99.5801C39.79 101.14 40.27 102.75 40.71 104.42L22.98 94.1801L10.21 86.8101C10.66 85.5901 11.1399 84.5301 11.6699 83.6201C12.1999 82.7001 12.8398 81.85 13.5698 81.05L17.3499 83.2401L22 85.9201L28.7 89.7901L37.3699 94.7901ZM31.75 83.8601L24.5 79.6701L22.21 78.3601L19.1699 76.6001C20.1199 76.0601 21.1399 75.5501 22.1899 75.0701C22.3499 75.0001 22.4999 74.9401 22.6399 74.8701C23.5699 74.4601 24.51 74.0701 25.46 73.6901C26.37 75.0901 27.2599 76.4801 28.1199 77.8601C28.3299 78.1901 28.54 78.5101 28.73 78.8401C29.8 80.5501 30.8 82.2201 31.75 83.8601ZM29.97 61.7201C29.58 61.9201 29.16 62.11 28.73 62.3C27.67 62.78 26.59 63.2401 25.46 63.6901C24.35 61.9501 23.2599 60.2301 22.1899 58.5301C21.1399 56.8301 20.1199 55.1601 19.1699 53.5201L31.4099 60.5801L31.75 60.7801C31.17 61.1001 30.59 61.4201 29.97 61.7201Z" stroke="black" strokeLinejoin="round" /><path d="M20.6899 39.0099L13.5698 42.58C12.8398 40.95 12.1999 39.35 11.6699 37.79C11.1399 36.24 10.66 34.62 10.21 32.96L20.6899 39.0099Z" stroke="black" strokeLinejoin="round" /><path d="M17.3499 83.2398L10.21 86.8098C10.66 85.5898 11.1399 84.5298 11.6699 83.6198C12.1999 82.6998 12.8398 81.8498 13.5698 81.0498L17.3499 83.2398Z" stroke="black" strokeLinejoin="round" /><path d="M40.71 104.42L22.98 94.1802L10.21 86.8102L17.3499 83.2402L22 85.9203L28.7 89.7903L37.3699 94.7903C38.0999 96.4303 38.71 98.0203 39.25 99.5803C39.79 101.14 40.27 102.75 40.71 104.42Z" stroke="black" strokeLinejoin="round" /><path d="M31.75 83.86L24.5 79.67L22.21 78.36L19.1699 76.6C20.1199 76.06 21.1399 75.5499 22.1899 75.0699C22.3499 74.9999 22.4999 74.9399 22.6399 74.8699C23.5699 74.4599 24.51 74.0699 25.46 73.6899C26.37 75.0899 27.2599 76.48 28.1199 77.86C28.3299 78.19 28.54 78.51 28.73 78.84C29.8 80.55 30.8 82.22 31.75 83.86Z" stroke="black" strokeLinejoin="round" /><path d="M40.7104 50.5703C40.2704 51.7803 39.7905 52.8503 39.2505 53.7603C39.2105 53.8103 39.1804 53.8703 39.1404 53.9203C38.6404 54.7703 38.0604 55.5803 37.3704 56.3303L13.5703 42.5803L20.6904 39.0103L35.1904 47.3802L40.7104 50.5703Z" stroke="black" strokeLinejoin="round" /><path d="M31.75 60.78C31.17 61.1 30.59 61.42 29.97 61.72C29.58 61.92 29.16 62.11 28.73 62.3C27.67 62.78 26.59 63.24 25.46 63.69C24.35 61.95 23.2599 60.23 22.1899 58.53C21.1399 56.83 20.1199 55.16 19.1699 53.52L31.4099 60.58L31.75 60.78Z" stroke="black" strokeLinejoin="round" /><path d="M68.9202 110.7V114.55L48.9202 124.55V120.7C48.9202 111.79 47.3101 103.63 44.0701 96.21C43.3501 94.56 42.5702 92.88 41.7102 91.15C39.9802 87.59 37.9802 83.87 35.7202 79.99C34.4802 77.87 33.17 75.69 31.78 73.47C31.41 72.88 31.0402 72.29 30.6602 71.69C32.7102 70.84 34.6001 69.9 36.3501 68.88L40.0002 67.07L45.8 64.2L50.7002 61.77C56.3902 70.67 60.8401 78.81 64.0701 86.21C67.3101 93.63 68.9202 101.79 68.9202 110.7Z" stroke="black" strokeLinejoin="round" /><path d="M68.9197 29.9199L62.0896 33.3398L61.7896 33.4898L54.6396 37.0598L48.9197 39.9199L42.2197 36.0498L47.9297 33.1898L55.0896 29.6198L62.2197 26.0498L68.9197 29.9199Z" stroke="black" strokeLinejoin="round" /><path d="M68.9197 29.9199V33.7699C68.9197 42.6799 67.3096 48.9699 64.0696 52.6499C61.6196 55.4099 58.4997 57.8099 54.6597 59.8199L52.3496 60.9599L50.6997 61.7699L45.7996 64.1999L39.9998 67.0699L36.3496 68.8699C37.4696 68.2199 38.5298 67.5299 39.5098 66.7899C40.0098 66.4299 40.4797 66.0499 40.9397 65.6599C42.0897 64.7099 43.1196 63.7099 44.0696 62.6499C46.1196 60.3199 47.5295 56.9399 48.2795 52.4999C48.4595 51.4099 48.5997 50.2499 48.6997 49.0299C48.8497 47.3899 48.9197 45.6399 48.9197 43.7699V39.9199L54.6396 37.0599L61.7896 33.4899L62.0896 33.3399L68.9197 29.9199Z" stroke="black" strokeLinejoin="round" /><path d="M28.8701 14.4902L8.87012 24.4902C8.82012 23.8202 8.78024 23.1702 8.75024 22.5402C8.71024 21.9202 8.7002 21.2502 8.7002 20.5502V16.7002L28.7002 6.7002V10.5502C28.7002 11.2502 28.7102 11.9202 28.7502 12.5402C28.7802 13.1702 28.8201 13.8202 28.8701 14.4902Z" stroke="black" strokeLinejoin="round" /><path d="M28.7 6.70007L8.69995 16.7001L2 12.8301L22 2.83008L28.7 6.70007Z" stroke="black" strokeLinejoin="round" /><path d="M55.0901 29.6202L47.9302 33.1902L42.2202 36.0502V39.9003C42.2202 40.6003 42.2102 41.2503 42.1802 41.8503C42.1602 42.4403 42.1201 43.0403 42.0601 43.6503L29.2102 36.2303L27.8501 35.4402L8.87012 24.4902L28.8701 14.4902L55.0901 29.6202Z" stroke="black" strokeLinejoin="round" /><path d="M15.8501 97.7499L8.7002 101.32V97.48C8.7002 96.77 8.71024 96.12 8.75024 95.53C8.78024 94.94 8.82012 94.34 8.87012 93.73L15.8501 97.7499Z" stroke="black" strokeLinejoin="round" /></svg>
            </div>
        </a>
    );
};
