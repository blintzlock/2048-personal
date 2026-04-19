/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({ 
      appName: 'Base 2048',
      preference: 'smartWalletOnly'
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
