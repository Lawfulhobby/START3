'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="flex items-center px-4 py-3 text-base rounded-full font-medium text-gray-950 bg-[#A479FF] hover:bg-black data-[hover]:bg-black"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
