'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { State, WagmiProvider } from 'wagmi';
import {
  RainbowKitProvider as NextRainbowKitProvider,
  RainbowKitAuthenticationProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { ReactNode, useState } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import wagmiConfig from '@/lib/config/wagmi';
import { authenticationAdapter } from '@/lib/utils/authenticationAdapter';
import useAsyncEffect from '@/lib/hooks/useAsyncEffect';
import { isAuthAction } from '@/lib/actions/auth';
import { Optional } from '@/lib/types/common';
import { eventEmitter } from '@/lib/config/clients/eventEmitter';
import { EMITTER_EVENTS } from '@/lib/constants';
import { config } from "@/lib/config";

type RainbowKitProviderProps = {
  children: ReactNode;
  initialState: State | undefined;
};

export default function RainbowKitProvider({
  children,
  initialState
}: RainbowKitProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<Optional<boolean>>();

  useAsyncEffect(async () => {
    const { isAuth } = await isAuthAction();

    setIsAuth(isAuth);
    setIsLoading(false);

    eventEmitter.on(EMITTER_EVENTS.SIGN_IN, () => setIsAuth(true));

    eventEmitter.on(EMITTER_EVENTS.SIGN_OUT, () => setIsAuth(false));

    return () => {
      eventEmitter.removeListener(EMITTER_EVENTS.SIGN_IN);
    };
  }, []);

  const status = isLoading
    ? 'loading'
    : isAuth
      ? 'authenticated'
      : 'unauthenticated';

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ReactQueryProvider>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={status}
        >
          <NextRainbowKitProvider
            // coolMode
            modalSize="compact"
            theme={lightTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: "medium",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >{children}</NextRainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
