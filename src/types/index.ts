import { W3bNumber } from "./wagmi.ts";

export type Plan = {
  verificationLink: string;
  id: number;
  title: string;
  requiredNodePower: string;
  verificationMethods: string;
  minNodePower: string | null;
  maxNodePower: string;
  APR: string;
  profitability: string;
  backgroundColor: string;
  shadowColor: string;
};

export type Step = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonLinkTarget: string;
  buttonDisabled: boolean;
};

export enum ActionType {
  VIEW = "VIEW",
  CREATE = "CREATE",
  UPGRADE = "UPGRADE",
  MERGE = "MERGE",
  SPLIT = "SPLIT",
  TRANSFER = "TRANSFER",
}

export type SidebarItem = {
  grayIcon: string;
  id: number;
  title: string;
  icon: string;
  hoverIcon: string;
  link: string;
  disabled: boolean;
  disabledMessage?: string;
  disabledIcon?: string;
};

export type UserWallet = {
  id: number;
  title: string;
  address: string;
  balance: string;
  verified: boolean;
};

export type RawRewards = {
  total_reward_e18: string;
  total_reward: number;
  signature: string | null;
  claimer: `0x${string}` | null;
  alice_operator: RawRewardSection;
  alice_operator_bounce: RawRewardSection;
  deus_allocation: RawRewardSection;
  deus_presale: RawRewardSection;
  early_alice_operator: RawRewardSection;
  muon_presale: RawRewardSection;
  muon_private_sale: RawRewardSection;
  uniquenessVerified: boolean;
};

export type Contributor = {
  contributor: `0x${string}`;
  reward: number;
  message: string;
};

export type RawRewardSection = {
  contributors: Contributor[];
  reward: number;
};

export type RewardWallet = {
  walletAddress: string;
  signature: string | null;
  wasInMuonPresale: boolean;
  wasInDeusPresale: boolean;
  wasInDeusAllocation: boolean;
  wasMuonPrivateSale: boolean;
  wasAliceOperator: boolean;
  wasAliceOperatorEarly: boolean;
  wasAliceOperatorBounce: boolean;
};

export enum NotificationSources {
  ALLOWANCE = "allowance",
  MINT_AND_LOCK = "mint_and_lock",
}

export type Notification = {
  id: string;
  source: NotificationSources;
  hash: `0x${string}` | null;
  type: NotificationType;
  status: NotificationStatuses;
  message: string;
};

export enum NotificationStatuses {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

export enum NotificationType {
  PROMISE = "promise",
  PENDING = "pending",
  TIMEOUT = "timeout",
}

export type RawBonPion = {
  __typename?: "AccountTokenId";
  account: any;
  latestTimestamp: any;
  tokenId: any;
};

export type BonMUON = {
  __typename?: "AccountTokenId";
  account: any;
  latestTimestamp: any;
  tokenId: any;
  ALICELockAmount: W3bNumber;
  LPTokenLockAmount: W3bNumber;
  nodePower: number;
  isNodeBonALICE?: boolean;
};

export type WalletWithSignature = {
  walletAddress: `0x${string}`;
  signature: string | null;
};

export type StateMessages = {
  pending: string;
  success: string;
  failed: string;
};

export type AlreadyRegisteredWallet = {
  isAlreadyRegistered: boolean;
  registeredTo: string;
};

export type MuonNodeStakingUsersResult = readonly [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint
];

export enum RewardStatus {
  TransferReward = "Transfer Reward",
  ReStakeReward = "ReStake Reward",
}
