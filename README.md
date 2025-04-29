# CryptoBen

A React application for swapping between different cryptocurrencies using USD as a base currency.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application
Start the development server:
```bash
npm start
```
The application will be available at [http://localhost:3000](http://localhost:3000)

## Key Development Decisions

### 1. Debounced Price Fetching
Instead of fetching token prices on every keystroke, we implemented a debounced approach that waits for 500ms of user inactivity before making API calls. This significantly reduces the number of API requests while still providing a responsive user experience. The debounce is implemented using React's `useEffect` and `setTimeout`, with proper cleanup to prevent memory leaks.

```typescript
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
```

### 2. Mobile-First Design with Zoom Prevention
To ensure a smooth mobile experience, we implemented several mobile-specific optimizations:
- Added viewport meta tags to prevent unwanted zooming on input focus
- Used responsive CSS units and flexbox for layout
- Implemented touch-friendly token selection interface

The zoom prevention is particularly important for the USD input field, as mobile browsers often zoom in on input fields, which can disrupt the user experience.

### 3. Token Selection Flow
The application implements an intuitive token selection flow where users:
1. First select a source token
2. Then select a target token
3. Can easily swap their selections

This is managed through a `nextSelection` state that tracks whether the user is selecting a source or target token, providing clear visual feedback about which selection is next. The interface guides users through the process while preventing invalid states (like selecting the same token for both source and target).

```typescript
const handleTokenClick = async (tokenSymbol: string) => {
  if (nextSelection === 'source') {
    setSourceToken(TOKEN_CONFIG[tokenSymbol]);
    setNextSelection('target');
  } else {
    setTargetToken(TOKEN_CONFIG[tokenSymbol]);
    setNextSelection('source');
  }
  // ... token info fetching logic
};
```
