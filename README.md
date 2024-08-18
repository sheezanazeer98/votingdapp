# Voting DApp

A decentralized voting application built with React, `ethers.js`, and styled with TailwindCSS. This project includes a Hardhat setup for Ethereum smart contract development.

## Features
- Connect to MetaMask for transactions.
- View and vote for candidates.
- Owner can reset votes.

## UI Images

![UI-1](https://coffee-closed-narwhal-255.mypinata.cloud/ipfs/QmderGJJYXFbAiYrsU2xtjnaAVjMnyjCVXTuaMjwHM37HN)

![UI-2](https://coffee-closed-narwhal-255.mypinata.cloud/ipfs/Qmbu5AHYKFEaRiFKU2PB9BjhQhZpWaErNQZZihJhjLYaNb)

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
