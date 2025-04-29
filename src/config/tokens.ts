import { TokenConfig } from '../models/Token';

export const TOKEN_CONFIG: TokenConfig = {
  USDC: {
    symbol: 'USDC',
    chainId: '1',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6
  },
  USDT: {
    symbol: 'USDT',
    chainId: '137',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6
  },
  ETH: {
    symbol: 'ETH',
    chainId: '8453',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18
  },
  WBTC: {
    symbol: 'WBTC',
    chainId: '1',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8
  },
  ARB: {
    symbol: 'ARB',
    chainId: '42161',
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    decimals: 18
  }
}; 
