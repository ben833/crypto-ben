export interface TokenInfo {
  symbol: string;
  chainId: string;
  address: string;
  decimals: number;
}

export interface TokenPrice {
  symbol: string;
  price: number;
}

export interface TokenConfig {
  [key: string]: TokenInfo;
} 
