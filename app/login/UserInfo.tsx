import React, { useEffect } from 'react';
import { useDynamicContext, DynamicContext } from '@dynamic-labs/sdk-react-core';
import {ethers} from "ethers";
interface PrimaryWallet {
  address: string | null;
}

const UserInfo: React.FC = () => {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet?.address) {
      console.log("User Address:", primaryWallet.address);
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      const wallet = new ethers.Wallet("5337308b084fac724cca9cf7c08c3ff2732f63194b9f77a14400800c79f915bb", provider);
      const contractABI = require('../../Blockchain/artifacts/contracts/TokenAirdrop .sol/TokenAirdrop.json')
      const contractAddress = '0x9E811101778199ed98e13999e7Bd055e1F6B96BF';
      const contractInstance = new ethers.Contract(contractAddress, contractABI, wallet);
      console.log(contractInstance);
    } else {
      console.log("No wallet connected");
    }
  }, [primaryWallet]);

  

  return (
    <div>
      {primaryWallet?.address ? (
        <p>Connected Wallet Address: {primaryWallet.address}</p>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
};

export default UserInfo;
