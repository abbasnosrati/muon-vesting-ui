import useVestedMuon from "../../hooks/useVesting";
import { ConnectWalletModal } from "../common/ConnectWalletModal";

const UserInfo = () => {
  const { vestedAmount } = useVestedMuon();
  return (
    <div className="flex items-center relative justify-center w-full max-w-[430px]">
      <ConnectWalletModal />
      <div className="w-full bg-sectionBg  2xl:min-h-[510px]">
        <div className="flex items-center px-10 font-medium font-azeretMono absolute h-[56px] -top-8 bg-textBackGround text-lightDarkText tracking-[1px]">
          Tools
        </div>
        <div className="muon actions-content  w-full px-4 py-8 min-h-[400px] md:min-h-[428px] md:max-h-[424px] overflow-hidden flex flex-col">
          <div className="mt-5 text-[12px] leading-5 text-base ">
            <div>Total Vested $Muon: {vestedAmount?.hStr ?? 0}</div>
            <div>Claimable Amount:</div>
            <div>Total Claimed:</div>
            <div>Duration:</div>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-10 flex justify-center ">
        <button
          disabled={!vestedAmount || !vestedAmount.dsp}
          className="btn  btn--small   max-w-[250px]"
        >
          Claim {vestedAmount?.hStr ?? 0} $MUON
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
