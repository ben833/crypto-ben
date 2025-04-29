import React from 'react';
import './TokenSwap.css';
import { TOKEN_CONFIG } from '../config/tokens';
import { useTokenSwap } from '../hooks/useTokenSwap';

const TokenSwap: React.FC = () => {
  const {
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
  } = useTokenSwap();

  return (
    <div className="token-swap-container">
      <h1>Token Swap</h1>
      <div className="usd-input">
        <label>
          $<input
            type="number"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            placeholder="Enter USD amount"
            min="0.00"
            max="10000000"
            step="1.00"
          />
        </label>
      </div>
      <div className="token-options">
        {TOKENS.map((token) => (
          <div key={token} className="token-box-container">
            <div className="selection-label">
              {getLabelForToken(token)}
            </div>
            <div
              className="token-box"
              onClick={() => handleTokenClick(token)}
            >
              {token}
            </div>
          </div>
        ))}
      </div>

      <div className="swap-section">
        <div className="token-selector">
          <select
            value={sourceToken?.symbol || ''}
            onChange={(e) => {
              const tokenSymbol = e.target.value;
              if (tokenSymbol) {
                setSourceToken(TOKEN_CONFIG[tokenSymbol]);
              } else {
                setSourceToken(null);
              }
            }}
          >
            <option value="">Select a token</option>
            {TOKENS.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
          {usdAmount && sourceToken && exchangeRates[sourceToken.symbol] && (
            <div className="token-amount">
              {calculateTokenAmount(sourceToken, parseFloat(usdAmount))?.toFixed(6)} {sourceToken.symbol}
            </div>
          )}
        </div>

        <div className="swap-arrow">→</div>

        <div className="token-selector">
          <select
            value={targetToken?.symbol || ''}
            onChange={(e) => {
              const tokenSymbol = e.target.value;
              if (tokenSymbol) {
                setTargetToken(TOKEN_CONFIG[tokenSymbol]);
              } else {
                setTargetToken(null);
              }
            }}
          >
            <option value="">Select a token</option>
            {TOKENS.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
          {usdAmount && targetToken && exchangeRates[targetToken.symbol] && (
            <div className="token-amount">
              {calculateTokenAmount(targetToken, parseFloat(usdAmount))?.toFixed(6)} {targetToken.symbol}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSwap; 
