import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { VESTING_ADDRESS, MUON_TOKEN_ADDRESS } from "../constants/addresses.ts";
import { getCurrentChainId } from "../web3/chains.ts";
import { w3bNumberFromBigint, w3bNumberFromString } from "../utils/web3.ts";
// import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
// import { config } from "../web3/config.ts";
// import MIGRATION_ABI from "../abis/Migration.ts";
// import useAllowance from "../hooks/useAllowance.ts";
// import PION_ABI from "../abis/Token.ts";
// import toast from "react-hot-toast";
import VestingAbi from "../abis/VestingAbi.ts";
import { Address } from "viem";
import { readContract } from "wagmi/actions";
import { config } from "../web3/config.ts";
import { useWagmiContractWrite } from "../hooks/useWagmiContractWrite.ts";

interface UserVestingInfoProp {
  releasableAmount: W3bNumber | null;
  totalVestedAmount: W3bNumber | null;
  releasedAmount: W3bNumber | null;
}

interface VestingInfoProp {
  startDate: string | null;
  endDate: string | null;
  duration: string | null;
}

const vestingInfoInit: VestingInfoProp = {
  startDate: null,
  endDate: null,
  duration: null,
};

const userVestingInfoInit: UserVestingInfoProp = {
  releasableAmount: null,
  totalVestedAmount: null,
  releasedAmount: null,
};

const VestingContext = createContext<{
  muonBalance: W3bNumber | null;
  refetchMuonBalance: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;

  isConnectWalletModalOpen: boolean;
  setIsConnectWalletModalOpen: (isOpen: boolean) => void;
  userVestingInfo: UserVestingInfoProp | null;
  vestingInfo: VestingInfoProp | null;
  handleClaim: () => void;
}>({
  muonBalance: null,
  refetchMuonBalance: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isConnectWalletModalOpen: false,
  setIsConnectWalletModalOpen: () => {},
  userVestingInfo: userVestingInfoInit,
  vestingInfo: vestingInfoInit,
  handleClaim: () => {},
});

const VestingProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [muonBalance, setMuonBalance] = useState<W3bNumber | null>(null);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState<boolean>(!walletAddress);

  const [userVestingInfo, setUserVestingInfo] =
    useState<UserVestingInfoProp>(userVestingInfoInit);

  const [vestingInfo, setVestingInfo] =
    useState<VestingInfoProp>(vestingInfoInit);

  useEffect(() => {
    setIsConnectWalletModalOpen(!walletAddress);
  }, [walletAddress]);

  const {
    data: muonBalanceData,
    isFetched: muonBalanceIsFetched,
    refetch: refetchMuonBalance,
  } = useBalance({
    address: walletAddress,
    token: MUON_TOKEN_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (muonBalanceIsFetched && muonBalanceData) {
      setMuonBalance(w3bNumberFromBigint(muonBalanceData.value));
    } else {
      setMuonBalance(null);
    }
  }, [muonBalanceIsFetched, muonBalanceData]);

  const formatDate = (timeStamp: bigint) => {
    const date = new Date(Number(timeStamp) * 1000);
    const parts = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).formatToParts(date);

    const day = parts.find((p) => p.type === "day")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    return `${day + " " + month + " " + year}`;
  };

  const formatDuration = (duration: bigint) => {
    const seconds = Number(duration);

    const years = Math.floor(seconds / 31104000);
    const months = Math.floor((seconds % 31104000) / 2592000);
    const weeks = Math.floor((seconds % 2592000) / 604800);
    // const days = Math.floor((seconds % 604800) / 86400);

    let result = "";
    if (years > 0) result += `${years} year${years > 1 ? "s" : ""} `;
    if (months > 0) result += `${months} month${months > 1 ? "s" : ""} `;
    if (weeks > 0) result += `${weeks} week${weeks > 1 ? "s" : ""} `;
    // if (days > 0) result += `${days} day${days > 1 ? "s" : ""}`;

    return result.trim();
  };

  const { data: userInfo, refetch: refetchUserVestingInfo } = useReadContracts({
    contracts: walletAddress
      ? [
          {
            abi: VestingAbi,
            address: VESTING_ADDRESS[getCurrentChainId()],
            functionName: "releasable",
            args: [walletAddress as Address],
          },
          {
            abi: VestingAbi,
            address: VESTING_ADDRESS[getCurrentChainId()],
            functionName: "users",
            args: [walletAddress as Address],
          },
        ]
      : [],
  });

  const { data: contractVestingInfo } = useReadContracts({
    contracts: [
      {
        abi: VestingAbi,
        address: VESTING_ADDRESS[getCurrentChainId()],
        functionName: "start",
      },
      {
        abi: VestingAbi,
        address: VESTING_ADDRESS[getCurrentChainId()],
        functionName: "end",
      },
      {
        abi: VestingAbi,
        address: VESTING_ADDRESS[getCurrentChainId()],
        functionName: "duration",
      },
    ],
  });

  useEffect(() => {
    if (!userInfo) return;
    setUserVestingInfo({
      ...userVestingInfo,
      releasableAmount:
        userInfo[0] && userInfo[0].result
          ? w3bNumberFromBigint(userInfo[0].result)
          : w3bNumberFromString("0"),

      totalVestedAmount:
        userInfo[1] && userInfo[1].result
          ? w3bNumberFromBigint(userInfo[1].result[0])
          : w3bNumberFromString("0"),

      releasedAmount:
        userInfo[1] && userInfo[1].result
          ? w3bNumberFromBigint(userInfo[1].result[1])
          : w3bNumberFromString("0"),
    });
  }, [userInfo]);

  useEffect(() => {
    if (!contractVestingInfo) return;
    setVestingInfo({
      ...vestingInfo,
      startDate:
        contractVestingInfo[0] && contractVestingInfo[0].result
          ? formatDate(contractVestingInfo[0].result)
          : null,
      endDate:
        contractVestingInfo[1] && contractVestingInfo[1].result
          ? formatDate(contractVestingInfo[1].result)
          : null,
      duration:
        contractVestingInfo[2] && contractVestingInfo[2].result
          ? formatDuration(contractVestingInfo[2].result)
          : null,
    });
  }, [contractVestingInfo]);

  const {
    callback: releaseClaimableAmount,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: VestingAbi,
    address: VESTING_ADDRESS[getCurrentChainId()] as Address,
    functionName: "release",
    chainId: getCurrentChainId(),
    showErrorToast: true,
  });

  const handleClaim = async () => {
    try {
      const claimableAmount = await readContract(config, {
        abi: VestingAbi,
        address: VESTING_ADDRESS[getCurrentChainId()] as Address,
        functionName: "releasable",
        args: [walletAddress as Address],
      });
      if (!claimableAmount) return;
      await releaseClaimableAmount?.({
        args: [claimableAmount],
        pending: "Transaction is being sent...",
        success: "Transaction was successful!",
        failed: "Transaction failed.",
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      await refetchUserVestingInfo();
    }
  };

  return (
    <VestingContext.Provider
      value={{
        muonBalance,
        refetchMuonBalance,
        isMetamaskLoading,
        isTransactionLoading,
        isConnectWalletModalOpen,
        setIsConnectWalletModalOpen,
        userVestingInfo,
        vestingInfo,
        handleClaim,
      }}
    >
      {children}
    </VestingContext.Provider>
  );
};

export const useVestingContext = () => useContext(VestingContext);

export { VestingProvider, VestingContext };
