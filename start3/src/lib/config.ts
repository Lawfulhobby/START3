'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { arbitrumSepolia , sepolia, celoAlfajores, optimismSepolia} from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = "db8b0b37d764ec63748a90b266315c3a";

const supportedChains: Chain[] = [arbitrumSepolia, sepolia,  celoAlfajores, optimismSepolia];

export const config = getDefaultConfig({
   appName: "WalletConnection",
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 });