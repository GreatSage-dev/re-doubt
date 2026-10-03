export type FlightStepId = 1 | 2 | 3 | 4 | 5;

export interface FlightStepInfo {
  id: FlightStepId;
  title: string;
  subtitle: string;
  keyword: string;
  description: string;
}

export interface MnemonicVerification {
  phrase: string[];
  entropyHex: string;
  checksumValid: boolean;
  testWordIndices: number[];
}

export type AddressType = 'transparent' | 'sapling' | 'unified_orchard' | 'invalid';

export interface DecodedAddress {
  raw: string;
  type: AddressType;
  isValid: boolean;
  prefix: string;
  receivers?: {
    orchard?: boolean;
    sapling?: boolean;
    transparent?: boolean;
  };
  details: string;
}

export interface SimulatedTransaction {
  id: string;
  timestamp: number;
  type: 'transparent_receive' | 'shield_to_orchard' | 'shielded_send';
  amount: number;
  fee: number;
  sender: string;
  recipient: string;
  memo?: string;
  status: 'confirmed' | 'pending';
  proofType: 'transparent_public' | 'halo2_orchard_zk';
  isSurveillanceVisible: boolean;
}

export interface SimulatorState {
  currentStep: FlightStepId;
  completedSteps: FlightStepId[];
  
  // Wallet & Balances
  seedPhrase: string[];
  isSeedBackedUp: boolean;
  transparentAddress: string;
  unifiedAddress: string;
  transparentBalance: number;
  shieldedBalance: number;
  
  // Transactions
  transactions: SimulatedTransaction[];
  
  // Current In-Progress Action
  selectedWalletClient: 'zashi' | 'ywallet';
  isShieldingInProgress: boolean;
  zkProofProgress: number; // 0 to 100
  
  // Real-world Bridge
  realAddressInput: string;
  realQrUri: string;
}

export interface NetworkStatus {
  blockHeight: number;
  network: 'mainnet' | 'testnet';
  shieldedPoolZec: number;
  latestBlockHash: string;
  lastUpdated: number;
  isLive: boolean;
}
