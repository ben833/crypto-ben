import { useState, useEffect, useCallback } from 'react';
import { TokenInfo, TokenPrice } from '../models/Token';
import { TOKEN_CONFIG } from '../config/tokens';
import { fetchTokenInfo, fetchTokenPrice } from '../services/tokenService';

const DEBOUNCE_DELAY = 500; // 500ms delay

export const useTokenSwap = () => {
  const [sourceToken, setSourceToken] = useState<TokenInfo | null>(null);
  const [targetToken, setTargetToken] = useState<TokenInfo | null>(null);
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [nextSelection, setNextSelection] = useState<'source' | 'target'>('source');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  const TOKENS = Object.keys(TOKEN_CONFIG);

  useEffect(() => {
    if (!usdAmount) return;

    const timeoutId = setTimeout(async () => {
      for (const token of TOKENS) {
        try {
          const tokenInfo = await fetchTokenInfo(token);
          const price = await fetchTokenPrice(tokenInfo.address, tokenInfo.chainId);
          setExchangeRates(prev => ({
            ...prev,
            [token]: price
          }));
        } catch (error) {
          console.error(`Error fetching price for ${token}:`, error);
        }
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [usdAmount]);

  const calculateTokenAmount = (token: TokenInfo, usdValue: number) => {
    const rate = exchangeRates[token.symbol];
    if (!rate) return null;
    return usdValue / rate;
  };

  const handleTokenClick = async (tokenSymbol: string) => {
    if (nextSelection === 'source') {
      setSourceToken(TOKEN_CONFIG[tokenSymbol]);
      setNextSelection('target');
    } else {
      setTargetToken(TOKEN_CONFIG[tokenSymbol]);
      setNextSelection('source');
    }

    try {
      const tokenInfo = await fetchTokenInfo(tokenSymbol);
      if (nextSelection === 'source') {
        setSourceToken(tokenInfo);
      } else {
        setTargetToken(tokenInfo);
      }
    } catch (error) {
      console.error(`Error fetching token info for ${tokenSymbol}:`, error);
    }
  };

  const getLabelForToken = (tokenSymbol: string) => {
    if (sourceToken?.symbol === tokenSymbol) return 'source';
    if (targetToken?.symbol === tokenSymbol) return 'target';
    return '';
  };

  return {
    sourceToken,
    targetToken,
    usdAmount,
    setUsdAmount,
    exchangeRates,
    TOKENS,
    calculateTokenAmount,
    handleTokenClick,
    getLabelForToken,
    setSourceToken,
    setTargetToken
  };
}; 
