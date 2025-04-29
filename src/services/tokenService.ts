import { getAssetErc20ByChainAndSymbol, getAssetPriceInfo } from '@funkit/api-base';
import { TokenInfo } from '../models/Token';
import { TOKEN_CONFIG } from '../config/tokens';

const API_KEY = 'Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk';

export const fetchTokenInfo = async (symbol: string): Promise<TokenInfo> => {
  const tokenConfig = TOKEN_CONFIG[symbol];
  if (!tokenConfig) {
    throw new Error(`Token ${symbol} not supported`);
  }

  try {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId: tokenConfig.chainId,
      symbol: tokenConfig.symbol,
      apiKey: API_KEY
    });

    return {
      ...tokenConfig,
      address: tokenInfo.address,
      decimals: tokenInfo.decimals
    };
  } catch (error) {
    console.error(`Error fetching token info for ${symbol}:`, error);
    return tokenConfig; // Return the hardcoded config as fallback
  }
};

export const fetchTokenPrice = async (tokenAddress: string, chainId: string): Promise<number> => {
  try {
    const priceInfo = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: tokenAddress,
      apiKey: API_KEY
    });
    return priceInfo.unitPrice;
  } catch (error) {
    console.error(`Error fetching price for token ${tokenAddress}:`, error);
    return 0;
  }
}; 
