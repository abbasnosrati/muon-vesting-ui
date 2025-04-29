import { useEffect, useState } from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useReadContract } from "wagmi";
import { VESTING_ADDRESS } from "../constants/addresses.ts";
import { w3bNumberFromBigint } from "../utils/web3.ts";
import { getCurrentChainId } from "../web3/chains.ts";
import Migration from "../abis/Migration.ts";

const useGetUserBurntAmount = (decimals = 18) => {
  const [userBurntAmount, setUserBurntAmount] = useState<W3bNumber | null>(
    null
  );
  const { address: walletAddress } = useAccount();

  const { data, isFetched, refetch } = useReadContract({
    abi: Migration,
    address: VESTING_ADDRESS[getCurrentChainId()],
    functionName: "migrations",
    args: walletAddress ? [walletAddress] : undefined,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      setUserBurntAmount(w3bNumberFromBigint(data, decimals));
    }
  }, [isFetched, data, decimals]);

  return { userBurntAmount, refetch };
};

export default useGetUserBurntAmount;
