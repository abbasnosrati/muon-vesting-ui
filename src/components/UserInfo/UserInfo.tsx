import { useAccount, useSwitchChain } from "wagmi";
import { useVestingContext } from "../../context/VestingContext";
import { ConnectWalletModal } from "../common/ConnectWalletModal";
import { getCurrentChainId } from "../../web3/chains";
import { w3bNumberFromBigint } from "../../utils/web3";

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
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-lightDarkText z-20 opacity-70"></div>
        )}
        <div className="flex items-center px-10 font-medium text-[18px] font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px] z-[20]">
          Your Balance
        </div>
        <div className="muon actions-content mt-3 w-full px-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <div className="mt-5 text-[12px] leading-5 text-base ">
            <div className="border-t items-center  flex justify-between gap-5">
              <span className="border-b  w-full text-nowrap py-[26px]">
                Total Vested $Muon:
              </span>
              <span className="border-b  w-full flex justify-center py-[22px]">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.totalVestedAmount?.dsp ?? "..."}
                </mark>
              </span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <span className="border-b w-full text-nowrap min-w-[198px] py-[26px]">
                Claimable Amount:
              </span>
              <span className="border-b w-full flex justify-center py-[22px]">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.releasableAmount?.dsp ?? "..."}
                </mark>
              </span>
            </div>

            <div className="flex justify-between items-center gap-5">
              <span className="border-b w-full text-nowrap min-w-[198px] py-[26px]">
                Total Claimed:
              </span>
              <span className="border-b w-full flex justify-center py-[22px]">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo?.releasedAmount?.dsp ?? "..."}
                </mark>
              </span>
            </div>

            <div className="flex justify-between items-center border-b py-[18px]">
              <span className="w-full">Remaining Amount:</span>
              <span className="w-full justify-center flex ml-9">
                <mark className="bg-textBackGround p-1">
                  {userVestingInfo &&
                  userVestingInfo.totalVestedAmount &&
                  userVestingInfo.releasedAmount
                    ? w3bNumberFromBigint(
                        userVestingInfo.totalVestedAmount.big -
                          userVestingInfo.releasedAmount.big
                      ).dsp
                    : "..."}
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
            {isMetamaskLoading ? "Waiting for confirm..." : "Waiting for Tx..."}
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
