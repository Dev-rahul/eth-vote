import React from "react";
import * as ethers from "ethers";
import { calculateMerkleRootAndZKProof } from "zk-merkle-tree";
import zKey from "../static/Verifier.zkey";
import {
  FingerPrintIcon,
  UserCircleIcon,
  HeartIcon,
  StarIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline"; // Importing Heroicons
import { useNavigate } from "react-router-dom";

const TREE_LEVELS = 20;

function Vote() {

  const navigate = useNavigate();

  async function fetchContracts() {
    try {
      const response = await fetch("contracts.json");
      const data = await response.json();
      console.log("got contract.json");
    } catch (error) {
      console.error("Error fetching contracts1:", error);
    }
  }

  const handleVote = async (candidate) => {
    const commitment = JSON.parse(
      localStorage.getItem("zktree-vote-commitment")
    );
    if (!commitment) {
      alert("No commitment generated, please register!");
      return;
    }

    const abi = [
      "function vote(uint _option,uint256 _nullifier,uint256 _root,uint[2] memory _proof_a,uint[2][2] memory _proof_b,uint[2] memory _proof_c)",
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    //fetchContracts();
    const contracts = await (await fetch("contracts.json")).json();
    //const contracts = {"mimc":"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9","verifier":"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707","zktreevote":"0x0165878A594ca255338adfa4d48449f69242Eb8F"};
    console.log("contracts", contracts, commitment);

    console.log("voted for", candidate, signer, contracts, commitment);
    //const zKey =   fetch("../../public/Verifier.zkey");

    const contract = new ethers.Contract(contracts.zktreevote, abi, signer);
    const cd = await calculateMerkleRootAndZKProof(
      contracts.zktreevote,
      signer,
      TREE_LEVELS,
      commitment,
      zKey
    );

    try {
      await contract.vote(
        candidate,
        cd.nullifierHash,
        cd.root,
        cd.proof_a,
        cd.proof_b,
        cd.proof_c
      );
      console.log('sucessfully voted');
      navigate("/");
      alert('You have successfully voted for candidate ' + candidate);
    } catch (e) {
      alert(e.reason);
      console.log("eee");
    }
  };

  const candidateIcons = [
    <FingerPrintIcon className="w-6 h-6 text-white" />,
    <UserCircleIcon className="w-6 h-6 text-white" />,
    <HeartIcon className="w-6 h-6 text-white" />,
    <StarIcon className="w-6 h-6 text-white" />,
    <HandThumbUpIcon className="w-6 h-6 text-white" />,
  ];

  const buttonStyles = [
    "bg-blue-500 hover:bg-blue-700", // Candidate 1
    "bg-green-500 hover:bg-green-700", // Candidate 2
    "bg-red-500 hover:bg-red-700", // Candidate 3
    "bg-yellow-500 hover:bg-yellow-700", // Candidate 4
    "bg-purple-500 hover:bg-purple-700", // Candidate 5
  ];

  return (
    <div className="flex flex-col items-center justify-center pt-4 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-8">Vote for Your Candidate</h2>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {[1, 2, 3, 4, 5].map((candidate, index) => (
          <button
            key={candidate}
            onClick={() => handleVote(candidate)}
            className={`flex items-center px-4 py-2 ${buttonStyles[index]} rounded-lg text-white font-medium shadow-md transition-transform transform hover:scale-105`}
          >
            <span className="mr-3">{candidateIcons[index]}</span>
            Candidate {candidate}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Vote;
