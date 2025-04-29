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
  const getInstructionText = () => {
    if (!usdAmount) {
      return "Enter your USD amount";
    }
    if (sourceToken && !targetToken) {
      return "Select your target currency";
    }
    return "Select your source and target currencies";
  };
  
  return (
    <div className="token-swap-container">
      <h1>Token Swap</h1>
      <div className="usd-input">
        <label>
          $<input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]*"
            value={usdAmount}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers and a single decimal point
              if (/^\d*\.?\d*$/.test(value)) {
                setUsdAmount(value);
              }
            }}
            placeholder="Dollar amount"
          />
        </label>
      </div>

      <div className="instruction-text">
        {getInstructionText()}
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
