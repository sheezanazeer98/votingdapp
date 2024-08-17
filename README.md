# Voting DApp

A decentralized voting application built with React, `ethers.js`, and styled with TailwindCSS. This project includes a Hardhat setup for Ethereum smart contract development.

## Features
- Connect to MetaMask for transactions.
- View and vote for candidates.
- Owner can reset votes.

## Setup

1. **Install  React Dependencies**
   ```bash
   npm install
   npm start
   ```

1. **Install Hardhat /contract Dependencies**
   ```bash
   npm install
   npx hardhat node
   npx compile
   npx hardhat run scripts/deploy.js
   ```   