import { SupportedChainId } from "../web3/chains";

export type AddressMap = { [chainId: number]: `0x${string}` };
export let MUON_TOKEN_ADDRESS: AddressMap;
export let VESTING_ADDRESS: AddressMap;

MUON_TOKEN_ADDRESS = {
  [SupportedChainId.AVALANCHFUJI]: "0x383FA34836A5F5D3805e77df4f60A62D75034579",
  [SupportedChainId.AVALANCH]: "0x6B1eCf0c181Afff3d7096B26C3d2bc31F55CEaB9",
};

VESTING_ADDRESS = {
  [SupportedChainId.AVALANCHFUJI]: "0x20B29de4a689C4cBAFA4982385541E09d8711123",
  [SupportedChainId.AVALANCH]: "0x9464176f2aff49a326177D83c456637EcC9fbc87",
};
