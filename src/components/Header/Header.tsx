import { useState } from "react";
import { FadeIn } from "../../animations";
import { MUON_TOKEN_ADDRESS } from "../../constants/addresses.ts";
import { getCurrentChainId } from "../../web3/chains.ts";
import { ConnectWalletButton } from "../common/ConnectWalletButton.tsx";
import { footerItems } from "../Footer/Footer.tsx";
// import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
// import { useStats } from '../../hooks/useStats.ts';

const menuItems = [
  {
    id: 0,
    title: "Homepage",
    src: "https://www.muon.net/",
  },
  {
    id: 1,
    title: "Node Dashboard",
    src: "https://app.muon.net/",
  },
  {
    id: 2,
    title: "Run a Node",
    src: "https://docs.muon.net/muon-protocol/running-a-muon-node",
  },
  { id: 3, title: "Docs", src: "https://docs.muon.net/muon-protocol" },
  {
    id: 4,
    title: "Buy $MUON",

    src: `https://lfj.gg/avalanche/swap?inputCurrency=${
      MUON_TOKEN_ADDRESS[getCurrentChainId()]
    }&outputCurrency=AVAX`,
  },
  {
    id: 5,
    title: "Support",
    src: `https://discord.com/channels/830888887253073920/1351862250217934860`,
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="z-[4000] px-5 sm:px-10 mt-8 relative">
      <div className="flex flex-row w-full md:items-center justify-between gap-4 mb-5 md:mb-0">
        <div className="flex items-center gap-[14px]">
          <div
            className="flex lg:hidden flex-col gap-[6px] cursor-pointer"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
            <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
            <div className="w-[18px] h-[2px] bg-lightDarkText"></div>
          </div>
          <img
            className="cursor-pointer "
            onClick={() => window.open("https://www.muon.net/", "_blank")}
            src="/assets/images/muonLogo.svg"
          />
          <div className="lg:flex hidden gap-[15px] sm:gap-[32px] border-b pb-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="custom-1110:text-[12px] text-sm cursor-pointer"
                onClick={() => window.open(item.src, "_blank")}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div
            className={`${
              !isMenuOpen && "hidden"
            }  flex-col gap-[15px] sm:gap-[32px] !font-normal pt-28  pb-1 fixed top-0 right-0 left-0 bottom-0 bg-menuBgColor`}
          >
            <div className="flex items-center gap-2 absolute top-11 left-5">
              <img
                className="cursor-pointer w-[15px] h-[15px]"
                src="/assets/images/navbar/closeMenu.svg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <img
                className="cursor-pointer w-[34px] h-[29px]"
                onClick={() => window.open("https://www.muon.net/", "_blank")}
                src="/assets/images/muonLogo.svg"
              />
            </div>

            <div className="flex flex-col border-l pl-3 ml-[36px] gap-40">
              <div className="flex flex-col gap-3">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-[12px] cursor-pointer"
                    onClick={() => window.open(item.src, "_blank")}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {footerItems.map((item, index) => (
                  <div
                    key={index}
                    className="text-[12px] cursor-pointer"
                    onClick={() => window.open(item.src, "_blank")}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 absolute bottom-10 left-0 right-0">
              <img
                className="w-[134px] h-[20px]"
                src="/assets/images/navbar/menuLogo.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <DesktopNavbar />
      </div>
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <FadeIn delay={0.3}>
      <div className="flex w-full navbar justify-start items-start md:items-end md:justify-end">
        <div className="navbar__right flex flex-col md:flex-row md:items-end gap-4">
          {/* <PriceTVLButton /> */}
          <ConnectWalletButton />
        </div>
      </div>
    </FadeIn>
  );
};

// const PriceTVLButton = () => {
//   const { ALICEPrice } = useTokenPrice();
//   const { stats } = useStats();
//   return (
//     <button className="btn btn--small h-6 flex !cursor-default">
//       <p className="text-lightDarkText 3xl:base text-sm font-medium">
//         {ALICEPrice ? `$${ALICEPrice}` : ''} (TVL:{' '}
//         {stats?.total_value_locked || '...'})
//       </p>
//     </button>
//   );
// };

export default Header;
