'use client';
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
  Badge,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { base } from "viem/chains"
import { useAccount } from 'wagmi';

type WalletWrapperParams = {
  address?: string;
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function WalletWrapper({
  className,
  text,
  withWalletAggregator = false,
}: WalletWrapperParams) {
  const { address } = useAccount();

  return (
    <>
      <Wallet>
        <ConnectWallet
          withWalletAggregator={withWalletAggregator}
          text={text}
          className={className}
        >
          {address &&
            <Identity
              address={address}
              chain={base}
              className='group rounded-full border border-[#A479FF] hover:bg-[#A479FF] text-white'
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            >
              <Avatar />
              <Name className='group-hover:text-white'>
                <Badge />
              </Name>
              <Address className='group-hover:text-white' />
            </Identity>
          }
        </ConnectWallet>
        <WalletDropdown className='border border-[#A479FF]'>
          <Identity
            chain={base}
            className="px-4 pt-3 pb-2 hover:bg-[#A479FF] group"
            hasCopyAddressOnClick={true}>
            <Avatar />
            <Name className='group-hover:text-white'/>
            <Address className='group-hover:text-white'/>
            <EthBalance className='group-hover:text-white'/>
          </Identity>
          <WalletDropdownBasename className='hover:bg-[#A479FF] hover:text-white'/>
          <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com" className='hover:bg-[#A479FF] hover:text-white'>
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownFundLink className='hover:bg-[#A479FF] hover:text-white'/>
          <WalletDropdownDisconnect className='hover:bg-[#A479FF] hover:text-white'/>
        </WalletDropdown>
      </Wallet>
    </>
  );
}
