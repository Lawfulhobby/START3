"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "@/lib/config";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0E76FD",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// "use client";
// import { ReactNode } from 'react';
// import { WagmiProvider, createConfig, http } from 'wagmi';
// import { baseSepolia } from 'wagmi/chains';
// import { coinbaseWallet } from 'wagmi/connectors';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// const wagmiConfig = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     coinbaseWallet({
//       appName: 'onchainkit',
//     }),
//   ],
//   ssr: true,
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });

// export default function Providers({ children }: { children: ReactNode }) {
//   return (
//     <WagmiProvider config={wagmiConfig}>
//        <QueryClientProvider client={queryClient}>
//       {children}
//       </QueryClientProvider>
//     </WagmiProvider>);
// }