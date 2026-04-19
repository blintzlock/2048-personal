/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAccount, useConnect, useDisconnect, useSendTransaction, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { Loader2, Wallet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { encodeFunctionData, stringToHex } from 'viem';

// Deployed contract address on Base
const CONTRACT_ADDRESS = '0xd9D09953a6270F989Aad0AD24Ed09Def1aFF73aD';

// The full builder code for display or string-based function calls if needed
const FULL_BUILDER_CODE = 'bc_xatr391l';
// The 8-character unique identifier part of the builder code
const BUILDER_ID = 'xatr391l';

const ABI = [
  {
    inputs: [{ internalType: 'string', name: 'builderCode', type: 'string' }],
    name: 'checkIn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

interface CheckInButtonProps {
  variant?: 'default' | 'minimal';
}

export function CheckInButton({ variant = 'default' }: CheckInButtonProps) {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { sendTransaction, isPending: isSending, isSuccess } = useSendTransaction();
  const [error, setError] = useState<string | null>(null);

  const handleCheckIn = async () => {
    setError(null);
    if (chainId !== base.id) {
      switchChain({ chainId: base.id });
      return;
    }

    try {
      // 1. Encode the function call data
      const baseCallData = encodeFunctionData({
        abi: ABI,
        functionName: 'checkIn',
        args: [FULL_BUILDER_CODE],
      });

      // 2. Convert the 8-character builder ID to hex
      // Note: slice(2) to remove '0x' prefix from the hex string
      const builderHexSuffix = stringToHex(BUILDER_ID).slice(2);

      // 3. Append the builder code hex suffix to the calldata as required by Base docs
      const finalData = `${baseCallData}${builderHexSuffix}` as `0x${string}`;

      // 4. Send the transaction with the augmented data
      sendTransaction({
        to: CONTRACT_ADDRESS as `0x${string}`,
        data: finalData,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex gap-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isConnecting}
            className="flex items-center gap-2 bg-base-blue text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all disabled:opacity-50 text-sm"
          >
            {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
            Connect {connector.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {variant === 'default' && (
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/10 shadow-sm mb-2">
          <span className="text-sm font-mono text-gray-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <button
            onClick={() => disconnect()}
            className="text-xs text-red-500 hover:underline"
          >
            Disconnect
          </button>
        </div>
      )}
      
      <button
        onClick={handleCheckIn}
        disabled={isSending || isSuccess}
        className="flex items-center justify-center gap-2 bg-base-blue text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale w-full sm:w-auto"
      >
        {isSending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Wallet className="w-5 h-5" />
        )}
        {isSuccess ? 'Check-in Complete!' : 'Claim Free Bonus'}
      </button>
      
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
