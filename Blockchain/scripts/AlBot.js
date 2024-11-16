  // deploy.js

  const { ethers } = require("ethers");
  require("dotenv").config(); // Make sure to use .env for sensitive data
  const Store = require("../artifacts/contracts/AIBot.sol/AIBot.json")
  async function main() {
    // Initialize provider (e.g., Alchemy or Infura URL)
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    // Initialize wallet with the private key
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Replace with your compiled contract's ABI and bytecode
    const contractABI = Store.abi;
    const address = "0x2c831d124348e075867ca41c7B632E2BEc59a7F3";
    const contractInstance = new ethers.Contract(address, contractABI, wallet)
  // await contractInstance.updateBotLearning("cbsvdcscbshbc","2");

  console.log("Updating bot learning...");
  const tx = await contractInstance.updateBotLearning("", "2");
  await tx.wait(); // Wait for the transaction to be mined
  console.log("Bot learning updated!");

  // Call the getBotMetadata function
  console.log("Fetching bot metadata...");
  const botMetadata = await contractInstance.getBotMetadata();

  const [name, description, learningModel, learningIterations, lastUpdated] = botMetadata;
  console.log("Bot Metadata:");
  console.log("Name:", name);
  console.log("Description:", description);
  console.log("Learning Model:", learningModel);
  console.log("Learning Iterations:", learningIterations.toString());
  console.log("Last Updated:", lastUpdated.toString());


    // Wait for the transaction to be mined
  //   await contract.waitForDeployment()
  //   console.log("shamuu")

  //   console.log("Contract deployed at address:", contract.target);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
