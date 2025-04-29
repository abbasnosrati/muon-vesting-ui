import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { W3bNumber } from "../types/wagmi.ts";
import { useAccount, useBalance } from "wagmi";
import { VESTING_ADDRESS, MUON_TOKEN_ADDRESS } from "../constants/addresses.ts";
import { getCurrentChainId } from "../web3/chains.ts";
import { w3bNumberFromBigint, w3bNumberFromString } from "../utils/web3.ts";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { config } from "../web3/config.ts";
import MIGRATION_ABI from "../abis/Migration.ts";
import useAllowance from "../hooks/useAllowance.ts";
import PION_ABI from "../abis/Token.ts";
import toast from "react-hot-toast";
import useGetUserBurntAmount from "../hooks/useGetUserBurntAmount.ts";

const VestingContext = createContext<{
  muonBalance: W3bNumber | null;
  refetchMuonBalance: () => void;
  isMetamaskLoading: boolean;
  handleConvert: () => void;
  migrateAmount: W3bNumber;
  setMigrateAmount: (amount: W3bNumber) => void;
  handleApprove: () => void;
  migrateAllowance: W3bNumber | null;
  isApproveModalOpen: boolean;
  setIsApproveModalOpen: (isOpen: boolean) => void;
  isConnectWalletModalOpen: boolean;
  setIsConnectWalletModalOpen: (isOpen: boolean) => void;
  userBurntAmount: W3bNumber | null;
}>({
  muonBalance: null,
  refetchMuonBalance: () => {},
  isMetamaskLoading: false,
  handleConvert: () => {},
  migrateAmount: w3bNumberFromString(""),
  setMigrateAmount: () => {},
  handleApprove: () => {},
  migrateAllowance: null,
  isApproveModalOpen: false,
  setIsApproveModalOpen: () => {},
  isConnectWalletModalOpen: false,
  setIsConnectWalletModalOpen: () => {},
  userBurntAmount: null,
});

const VestingProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress } = useAccount();
  const [muonBalance, setMuonBalance] = useState<W3bNumber | null>(null);
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [migrateAmount, setMigrateAmount] = useState(w3bNumberFromString(""));
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState<boolean>(!walletAddress);

  useEffect(() => {
    setIsConnectWalletModalOpen(!walletAddress);
  }, [walletAddress]);

  const { allowance: migrateAllowance, refetch: refetchMigrateAllowance } =
    useAllowance(
      MUON_TOKEN_ADDRESS[getCurrentChainId()],
      VESTING_ADDRESS[getCurrentChainId()]
    );

  const { userBurntAmount, refetch: refetchUserBurntAmount } =
    useGetUserBurntAmount();

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

  const handleConvert = async () => {
    try {
      setIsMetamaskLoading(true);
      const result = await writeContract(config, {
        address: VESTING_ADDRESS[getCurrentChainId()],
        abi: MIGRATION_ABI,
        functionName: "migrate",
        args: [migrateAmount.big],
        chainId: getCurrentChainId() as any,
      });

      const ts = waitForTransactionReceipt(config, {
        hash: result,
      });

      await toast.promise(ts, {
        loading: "Burning...",
        success: "Burned!",
        error: "Failed to Burn.",
      });
    } finally {
      setIsMetamaskLoading(false);
      refetchMuonBalance();
      refetchMigrateAllowance();
      refetchUserBurntAmount();
      setMigrateAmount(w3bNumberFromString(""));
    }
  };

  const handleApprove = async () => {
    try {
      setIsApproveModalOpen(true);
      setIsMetamaskLoading(true);
      const result = await writeContract(config, {
        address: MUON_TOKEN_ADDRESS[getCurrentChainId()],
        abi: PION_ABI,
        functionName: "approve",
        args: [VESTING_ADDRESS[getCurrentChainId()], migrateAmount!.big],
      });
      const ts = waitForTransactionReceipt(config, {
        hash: result,
      });

      await toast.promise(ts, {
        loading: "Approving...",
        success: "Approved!",
        error: "Failed to Approve.",
      });

      refetchMigrateAllowance();
    } finally {
      setIsApproveModalOpen(false);
      setIsMetamaskLoading(false);
    }
  };

  return (
    <VestingContext.Provider
      value={{
        muonBalance,
        refetchMuonBalance,
        isMetamaskLoading,
        handleConvert,
        migrateAmount,
        setMigrateAmount,
        handleApprove,
        migrateAllowance,
        isApproveModalOpen,
        setIsApproveModalOpen,
        isConnectWalletModalOpen,
        setIsConnectWalletModalOpen,
        userBurntAmount,
      }}
    >
      {children}
    </VestingContext.Provider>
  );
};

export const useVestingContext = () => useContext(VestingContext);

export { VestingProvider, VestingContext };
