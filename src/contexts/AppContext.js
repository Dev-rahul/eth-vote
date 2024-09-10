// src/AppContext.js
import React, { createContext, useState, useMemo, useEffect } from 'react';
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


  useEffect(() => {
    checkIfMetaMaskConnected();
  }, []);

  // Check if MetaMask is connected
  const checkIfMetaMaskConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          handleAccountChange(accounts); // Handles account logic
        } else {
          console.log("MetaMask is not connected.");
        }
      } catch (error) {
        console.log("Error checking MetaMask connection:", error);
      }
    } else {
      console.log("MetaMask not detected.");
    }
  };


  const handleClick = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleAccountChange(accounts);
 
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const handleAccountChange = async (accounts) => {
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
  }

  window.onload = (event) => {
    checkConnection();
 };
  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.on("accountsChanged");
      console.log("onLoad ", accounts)
      handleAccountChange(accounts);

    } catch (error) {
      console.log("Error connecting...");
    }
  }

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
