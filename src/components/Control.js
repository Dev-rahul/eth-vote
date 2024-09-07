import React from "react";
import { ethers } from "ethers";

function Control() {

  // Define ABI for startVoting and stopVoting functions
  const abi = [
    "function startVoting() external",
    "function stopVoting() external",
  ];

  // Function to start the poll
  const startPoll = async () => {
    if (window.ethereum) {
     const contracts = await (await fetch("contracts.json")).json();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contracts.zktreevote, abi, signer);

      try {
        const tx = await contract.startVoting(); // Call the startVoting function
        await tx.wait(); // Wait for the transaction to be mined
        alert("Poll started successfully!");
      } catch (error) {
        console.error("Error starting poll:", error);
        alert("Failed to start poll. Make sure you're a validator.");
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  // Function to stop the poll
  const endPoll = async () => {
    if (window.ethereum) {
        const contracts = await (await fetch("contracts.json")).json();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contracts.zktreevote, abi, signer);

      try {
        const tx = await contract.stopVoting(); // Call the stopVoting function
        await tx.wait(); // Wait for the transaction to be mined
        alert("Poll ended successfully!");
      } catch (error) {
        console.error("Error ending poll:", error);
        alert("Failed to end poll. Make sure you're a validator.");
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
      <div className="space-y-4">
        <button
          onClick={startPoll}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-medium shadow-md"
        >
          Start Poll
        </button>
        <button
          onClick={endPoll}
          className="px-6 py-2 ml-2 bg-red-500 hover:bg-red-700 rounded-lg text-white font-medium shadow-md"
        >
          End Poll
        </button>
      </div>
    </div>
  );
}

export default Control;

