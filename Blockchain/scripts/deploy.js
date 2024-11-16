// deploy.js

const { ethers } = require("ethers");
require("dotenv").config(); // Make sure to use .env for sensitive data
  // const Store = require("../artifacts/contracts/Lock.sol/Store.json")
const Store = require("../artifacts/contracts/AIBot.sol/AIBot.json")


// fucntion which will make POST call to 



async function main() {
  // Initialize provider (e.g., Alchemy or Infura URL)
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // Initialize wallet with the private key
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Replace with your compiled contract's ABI and bytecode
  const contractABI = Store.abi;
  const contractBytecode =Store.bytecode; 

 
  // Contract bytecode

  

  // Create a ContractFactory instance
  const ContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);


  // Deploy the contract
  console.log("Deploying contract...");
  const contract = await ContractFactory.deploy("Shamu","user","0xcc1275300132C5D39Ca73e04A84f86b5bbB9f202");

  
// Add constructor args if needed

  // Wait for the transaction to be mined
  await contract.waitForDeployment()
  console.log("shamuu")


  console.log("Contract deployed at address:", contract.target);

  


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
