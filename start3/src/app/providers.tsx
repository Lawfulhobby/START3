"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from '@vercel/analytics/react';
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
        modalSize="compact"
          theme={lightTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
          <Analytics/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

