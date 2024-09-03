import React, { useEffect, useState } from "react";
import * as ethers from "ethers";

// const   options = [0, 0, 0, 0];

function Results() {
  const [options, setOptions] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const abi = [
      "function getOptionCounter(uint _option) external view returns (uint)",
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contracts = await (await fetch("contracts.json")).json();
    const contract = new ethers.Contract(contracts.zktreevote, abi, signer);
    let newOptions = [...options];
    for (let i = 0; i < 5; i++) {
      newOptions[i] = (await contract.getOptionCounter(i + 1)).toString();
      console.log("Vote for " + i + " = " + newOptions[i]);
    }
    setOptions(newOptions);
  };
  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="text-xl font-semibold mb-4 text-center text-gray-800">
          Results
        </div>

        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium text-gray-700">Candidate 1:</span>
          <span className="font-semibold text-gray-900">{options[0]}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium text-gray-700">Candidate 2:</span>
          <span className="font-semibold text-gray-900">{options[1]}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium text-gray-700">Candidate 3:</span>
          <span className="font-semibold text-gray-900">{options[2]}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="font-medium text-gray-700">Candidate 4:</span>
          <span className="font-semibold text-gray-900">{options[3]}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="font-medium text-gray-700">Candidate 5:</span>
          <span className="font-semibold text-gray-900">{options[4]}</span>
        </div>
      </div>
    </div>
  );
}

export default Results;
