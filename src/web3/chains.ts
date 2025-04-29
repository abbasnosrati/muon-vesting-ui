/**
 * List of all the networks supported by the ALICE Interface
 */
export enum SupportedChainId {
  AVALANCHFUJI = 43113,
  AVALANCH = 43114,
}
export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.AVALANCHFUJI]: "avalancheFuji",
  [SupportedChainId.AVALANCH]: "avalanche",
};

/**
 * All the chain IDs that are running the Ethereum protocol.
 */

export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}

export function getCurrentChainId(): SupportedChainId {
  return Number(import.meta.env.VITE_APP_CHAIN_ID) as SupportedChainId;
}
