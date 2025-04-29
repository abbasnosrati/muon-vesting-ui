import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useVestingContext } from "../../context/VestingContext";

export const ConnectWalletButton = ({
  size,
  withIcon,
  light,
}: {
  size?: "sm" | "md" | "lg";
  withIcon?: boolean;
  light?: boolean;
}) => {
  const { muonBalance } = useVestingContext();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                if (withIcon) {
                  return (
                    <button
                      className={`btn btn--small ${size} ${light}`}
                      onClick={openConnectModal}
                    >
                      <img
                        className="h-6 md:h-8 w-auto"
                        src="/assets/images/migration/wallet-icon.svg"
                        alt=""
                      />
                      <p className="text-inherit">Connect Wallet</p>
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="btn btn--action btn--small"
                    >
                      Connect Wallet
                    </button>
                  );
                }
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="btn btn--action btn--small"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className={`btn  btn--action text-nowrap btn--small`}
                >
                  {account.displayName} | {muonBalance?.dsp ?? 0} $MUON
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
