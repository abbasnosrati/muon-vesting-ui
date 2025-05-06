import { useAccount, useSwitchChain } from "wagmi";
import { useVestingContext } from "../../context/VestingContext";
import { ConnectWalletModal } from "../common/ConnectWalletModal";
import { getCurrentChainId } from "../../web3/chains";

const UserInfo = () => {
  const {
    userVestingInfo,
    handleClaim,
    isTransactionLoading,
    isMetamaskLoading,
  } = useVestingContext();

  const { address: walletAddress, chainId, isConnected } = useAccount();

  const { switchChain } = useSwitchChain();

  return (
    <div className="flex items-center relative justify-center w-full max-w-[430px]">
      <ConnectWalletModal />
      <div className="w-full bg-sectionBg relative 2xl:min-h-[510px]">
        {!walletAddress && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-500 z-20 opacity-80"></div>
        )}
        <div className="flex items-center px-10 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px]">
          Tools
        </div>
        <div className="muon actions-content mt-3 w-full px-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <div className="mt-5 text-[12px] leading-5 text-base ">
            <div className="border-t py-5 flex justify-between gap-5">
              <span className="border-b pb-5 w-full text-nowrap">
                Total Vested $Muon:
              </span>{" "}
              <span className="border-b pb-5 w-full flex justify-center">
                {" "}
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.totalVestedAmount?.hStr ?? "..."}
                </mark>
              </span>
            </div>
            <div className="flex justify-between gap-5">
              <span className="border-b pb-5 w-full text-nowrap">
                Claimable Amount:
              </span>
              <span className="border-b pb-5 w-full flex justify-center">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.releasableAmount?.dsp ?? "..."}
                </mark>
              </span>
            </div>
            <div className="flex justify-between border-b py-5">
              <span className="w-full">Total Claimed:</span>
              <span className="w-full justify-center flex ml-6">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.releasedAmount?.dsp ?? "..."}
                </mark>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-10 flex justify-center ">
        {isConnected && getCurrentChainId() !== chainId ? (
          <button
            onClick={() => switchChain({ chainId: getCurrentChainId() })}
            className="btn  btn--small  max-w-[250px] text-nowrap"
          >
            Switch Network
          </button>
        ) : isTransactionLoading || isMetamaskLoading ? (
          <button
            disabled={true}
            className="btn  btn--small   max-w-[250px] text-nowrap"
          >
            {isMetamaskLoading ? "waiting for confirm..." : "waiting for Tx..."}
          </button>
        ) : (
          <div>
            <button
              disabled={
                !userVestingInfo ||
                !userVestingInfo.releasableAmount?.big ||
                isTransactionLoading ||
                isMetamaskLoading
              }
              className="btn  btn--small   max-w-[250px] text-nowrap"
              onClick={() => handleClaim()}
            >
              Claim {userVestingInfo?.releasableAmount?.dsp ?? 0} $MUON
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
