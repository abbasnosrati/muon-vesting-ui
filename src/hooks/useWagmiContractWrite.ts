import { useCallback, useState } from "react";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { toast } from "react-hot-toast";
import { Address } from "viem";
import { config } from "../web3/config";
import { getCurrentChainId } from "../web3/chains";

type Props = {
  abi: any;
  address: Address;
  functionName: string;
  args?: any[];
  chainId: number;
  showErrorToast?: boolean;
};

type CallbackParams = {
  args?: any[];
  pending?: string;
  success?: string;
  failed?: string;
};

export const useWagmiContractWrite = ({
  abi,
  address,
  functionName,
  args,
  chainId,
  showErrorToast = false,
}: Props) => {
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const callback = useCallback(
    async ({ args: dynamicArgs, pending, success, failed }: CallbackParams) => {
      setIsMetamaskLoading(true);
      setIsFailed(false);
      setIsSuccess(false);

      try {
        const hash = await writeContract(config, {
          abi,
          address,
          functionName,
          args: dynamicArgs || args || [],
          chainId: getCurrentChainId(),
        });

        setIsMetamaskLoading(false);

        if (!hash) throw new Error("No hash returned from writeContract");
        setIsTransactionLoading(true);
        setTransactionHash(hash);

        const txReceipt = await waitForTransactionReceipt(config, {
          hash,
          chainId: getCurrentChainId(),
        });

        await toast.promise(Promise.resolve(txReceipt), {
          loading: pending || "Waiting for transaction...",
          success: success || "Transaction successful!",
          error: failed || "Transaction failed.",
        });

        setIsTransactionLoading(false);
        setIsSuccess(true);
      } catch (error: any) {
        setIsMetamaskLoading(false);
        setIsTransactionLoading(false);
        setIsFailed(true);
        if (showErrorToast) {
          toast.error(error?.message || "Transaction failed");
        }
        throw error;
      }
    },
    [abi, address, functionName, args, chainId, showErrorToast]
  );

  return {
    callback,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
    isFailed,
    transactionHash,
  };
};
