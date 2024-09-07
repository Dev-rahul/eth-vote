// src/AppContext.js
import React, { createContext, useState, useMemo } from 'react';
import { ethers } from 'ethers';

const AppContext = createContext();

const abi = ["function isValidator(address _address) view returns (bool)"];

export const AppProvider = ({ children }) => {
  const [validatorAddress, setValidatorAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const truncatedAddress = useMemo(() => {
    if (!validatorAddress) return "";
    return `${validatorAddress.slice(0, 6)}...${validatorAddress.slice(-4)}`;
  }, [validatorAddress]);

  const handleClick = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        for (let i = 0; i < accounts.length; i++) {
          const address = accounts[i];
          const isValidatorStatus = await isValidator(address);

          if (isValidatorStatus) {
            setValidatorAddress(address);
            console.log(`Address ${address} is a validator.`);
            break;
          } else {
            console.log(`Address ${address} is not a validator.`);
          }
        }
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const isValidator = async (address) => {
    const contracts = await (await fetch("contracts.json")).json();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contracts.zktreevote, abi, signer);

    try {
      const isValidator = await contract.isValidator(address);
      console.log(`Is ${address} a validator?`, isValidator);
      return isValidator;
    } catch (err) {
      console.error("Error checking validator status:", err);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ validatorAddress, isConnected, handleClick, truncatedAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
