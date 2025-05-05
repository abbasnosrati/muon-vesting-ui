import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { avalancheFuji, avalanche } from "wagmi/chains";
import {
  rabbyWallet,
  walletConnectWallet,
  rainbowWallet,
  coinbaseWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";
import { getCurrentChainId } from "./chains";

export const projectId = "9ba1501155f1e72178bc1861538ba8bd";

if (!projectId) throw new Error("Project ID is not defined");

const getRPCURL = (chainID: number) => {
  switch (chainID) {
    case 43113:
      return "https://api.avax-test.network/ext/bc/C/rpc";
    case 43114:
      return "https://api.avax.network/ext/bc/C/rpc";
  }
};

const transports = {
  43113: http(getRPCURL(getCurrentChainId())),
  43114: http(getRPCURL(getCurrentChainId())),
};

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rabbyWallet,
        rainbowWallet,
        coinbaseWallet,
      ],
    },
  ],
  {
    appName: "Muon Vesting",
    projectId,
  }
);

export const configs = getDefaultConfig({
  appName: "Muon Vesting",
  projectId,
  chains: [getCurrentChainId() === 43113 ? avalancheFuji : avalanche],
  transports,
});

export const config = createConfig({
  chains: [getCurrentChainId() === 43113 ? avalancheFuji : avalanche],
  connectors,
  transports,
});
