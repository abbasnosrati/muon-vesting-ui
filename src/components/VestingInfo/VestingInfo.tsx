import { useVestingContext } from "../../context/VestingContext";
import { ConnectWalletModal } from "../common/ConnectWalletModal";

const VestingInfo = () => {
  const { vestingInfo } = useVestingContext();
  return (
    <div className="flex items-center justify-center w-full max-w-[430px] font-azeretMono">
      <ConnectWalletModal />
      <div className="w-full  bg-sectionBg relative 2xl:min-h-[510px]">
        <div className="flex items-center px-10 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px]">
          Stats
        </div>
        <div className="muon actions-content  w-full px-4 mt-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <div className=" border-t  m-4 py-6">
            <div className="w-full flex items-center justify-between">
              <div className="border-b w-full max-w-[200px] pb-6">
                Vesting Start Date:
              </div>
              <div className="border-b w-full flex justify-center items-center max-w-[150px] pb-4">
                <mark className="bg-textBackGround p-1">
                  {vestingInfo?.startDate ?? ".. ... ..."}
                </mark>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="border-b w-full max-w-[200px] py-6">
                Vesting End Date:
              </div>
              <div className="border-b w-full flex justify-center max-w-[150px] py-5">
                <mark className="bg-textBackGround p-1">
                  {vestingInfo?.endDate ?? ".. ... ...."}
                </mark>
              </div>
            </div>

            <div className="w-full flex items-center justify-between border-b">
              <div className="w-full max-w-[200px] ">Duration:</div>
              <div className=" w-full flex justify-center max-w-[150px] py-4">
                <mark className="bg-textBackGround p-1">
                  {vestingInfo?.duration ?? ".. months"}
                </mark>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestingInfo;
