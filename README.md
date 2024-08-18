# Voting DApp

A decentralized voting application built with React, `ethers.js`, and styled with TailwindCSS. This project includes a Hardhat setup for Ethereum smart contract development.

## Features
- Connect to MetaMask for transactions.
- View and vote for candidates.
- Owner can reset votes.

## UI Images

![UI-1](https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEXYErjT047kv%2Bos5WCcv%2Bslgop4Gn4M30to4UaWJ8kJ1tGjUgFapurHgUKkiios3GCUU4X%2FnFLVa7dUZ5uiUfBcgaGnc02p5%2FJ2dmprG4r78uYKoylsjiLZG%2Bva3v7S0GXS4hc6QimspPTeeqeuRtvPrVMXMURh8VsUo8T0cB8QVpr3S3YxAbPpAdYIAH2Pp5B0R3prAVR1%2F3Wg3Kx9yVumlaOjIuYj%2BlYa8Bb%2Fb8pWl1me1BGXnXpR8S0izEmC08ydnA9URwMmMFCEcUddYnAqm11LkKZxqU8klAGsdlbrU%2F85gjP56b7onpWRO1UgObp%2F0BD1J%2BTYQNjVSceth0Nn%2FxKy7mjAzx5RyLoSFpQmkHlAZj1oQF%2FSzEKnQgm665h%2BZ0Oymzj9hbvA5coSfJ9MPSsfLTVgxesgGag2XwDkykXdii1CIe0W4lHmV6uH2616VzGDzLtxZBvKsn7tDG5MfNZV%2B36zf2FuiUZGS%2Fs6qyIo4ZcykM9eIM8wRcocxE2Y7QEfD1fzFMJQb%2BL2us0dM%2BtLMcr0ZVcuBCudj9InKJE5uc30iEzcmmkykPlPdyrmxUJd6sBarw%3D%3D&sz=w512)

![UI-2](https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEUEme7trBXNfImQL1SpTE5DoptPzHXE2K08iwt3hhC4hho3MppeIvB5zQzsC4FUMXwzn2dNma1d5Lgy5NVTmXR01qX274eRW2NUG35JhHDhM0zuSbd%2Fv65alsnKXbAxbUPxSQVi8j93L2GuKzD9GCvFEX42Q3lQcIjINHek1JNY6nfpWnDfqeogVEewFT0DQGALx86gYOouqWksT9TNm3pnRYQp5b2fMqfMdvlk6pp79VssQbkOoYDuhf%2BHlF5%2F5PLSQL0966qDjH0QtzsE91sqpGBj%2FUv80572uDJKseAb5lyZ%2FW83UtqttVORZBwu1tosQIxB0%2BJS7Jqp0urBfWbhzpno5CzvXzzqnrMf55VEwSJDqZRvrzM%2BNbNy%2BA8Jm6CrVoA46QfwajaSD9h0wFopeOg203fMnOfx7fG%2FrjQ8HtcA8mGu99DTJnasDDLIOWDSD4MIBqky3MeO%2BWLWokecXJ20emiFS2VPPq4AxDmrl0jYJs3rIMccLOhCfKKAmOtMokLYExaT%2F8iK4bQUnYLe9%2B5ELWnCbuyfKBpw8c4iAx%2FLhxbWaX937HKfnuhOua7A2y6WTNiL6Pk%3D&sz=w512)

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
