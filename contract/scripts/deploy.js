const { ethers } = require("hardhat");

async function main() {
//   Get the contract factory
  const contract = await ethers.getContractFactory("Voting");

  // Deploy the contract
  const deployedContract = await contract.deploy();

  await deployedContract.waitForDeployment();

  console.log("Voting Contract deployed to", deployedContract.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });