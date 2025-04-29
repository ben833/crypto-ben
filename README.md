# CryptoBen

A React application for swapping between different cryptocurrencies using USD as a base currency.

## Live Demo
The application is live at [https://crypto-ben.vercel.app/](https://crypto-ben.vercel.app/)

## Repository Access
This is a private repository. To get access:
1. Contact the repository owner for an invite
2. Once invited, you'll receive an email notification
3. Accept the invitation to gain access to the repository

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
Instead of fetching token prices on every keystroke, we implemented a debounced approach that waits for 500ms of user inactivity before making API calls. This significantly reduces the number of API requests while still providing a responsive user experience.

### 2. Mobile-First Design with Zoom Prevention
To ensure a smooth mobile experience, we implemented several mobile-specific optimizations:
- Added viewport meta tags to prevent unwanted zooming on input focus
- Used responsive CSS units and flexbox for layout
- Implemented touch-friendly token selection interface

### 3. Token Selection Flow
The application implements an intuitive token selection flow where users:
1. First select a source token
2. Then select a target token
3. Can easily swap their selections

This is managed through a state that tracks the selection process, providing clear visual feedback about which selection is next. The interface guides users through the process while preventing invalid states.
