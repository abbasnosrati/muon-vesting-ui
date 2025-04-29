import { ConnectWalletModal } from "../common/ConnectWalletModal";

const UserInfo = () => {
  return (
    <div className="flex items-center justify-center w-full max-w-[430px]">
      <ConnectWalletModal />
      <div className="w-full  bg-sectionBg relative 2xl:min-h-[510px]">
        <div className="flex items-center px-10 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px]">
          Tools
        </div>
        <div className="muon actions-content  w-full px-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <div className="mt-5 text-[12px] leading-5">
            <div>Vesting Start Date:</div>
            <div>Vesting End Date:</div>
            <div>Duration:</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
