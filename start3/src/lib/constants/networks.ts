// src/constants/networks.ts

export const base_mainnet = {
    id: 8453,
    name: 'Base Mainnet',
    network: 'base_mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.base.org/'],
    blockExplorers: {
      default: { name: 'BSCScan', url: 'https://bscscan.com' },
    },
    testnet: false,
  };
  
  export const base_sepolia = {
    id: 84532,
    name: 'Base Sepolia',
    network: 'base_sepolia',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorers: {
      default: { name: 'BSCScan', url: 'https://bscscan.com' },
    },
    testnet: true,
  };