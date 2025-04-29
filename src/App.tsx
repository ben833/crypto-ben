import React from 'react';
import './App.css';
import TokenSwap from './components/TokenSwap';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoBen</h1>
        <TokenSwap />
      </header>
    </div>
  );
};

export default App; 
