// TokenAirdrop.js
import React, { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';

const TokenAirdrop = () => {
  const { primaryWallet } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (primaryWallet?.address) {
      console.log('User Address:', primaryWallet.address);
      setWalletAddress(primaryWallet.address);  // Store address for later use
    } else {
      console.log('No wallet connected');
    }
  }, [primaryWallet]);

  const handleAirdrop = async () => {
    if (!walletAddress) {
      console.log('No wallet address to airdrop to.');
      return;
    }

    // Set up provider and contract (example based on your deploy.js logic)
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractABI = require('../artifacts/contracts/TokenAirdrop .sol/TokenAirdrop.json')
    const contractAddress = '0x9E811101778199ed98e13999e7Bd055e1F6B96BF';
    const contractInstance = new ethers.Contract(contractAddress, contractABI, wallet);

    try {
      const tx = await contractInstance.airdropTokens(walletAddress); // Assuming `airdropTokens` is a contract method
      await tx.wait();  // Wait for the transaction to be mined
      console.log('Airdrop Successful!');
    } catch (err) {
      console.error('Error in Airdrop:', err);
    }
  };

  return (
    <div>
      <h2>Token Airdrop</h2>
      <button onClick={handleAirdrop}>Airdrop to Wallet</button>
    </div>
  );
};

export default TokenAirdrop;
