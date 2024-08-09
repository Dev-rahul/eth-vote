import React from 'react'
import * as ethers from "ethers";
import { calculateMerkleRootAndZKProof } from "zk-merkle-tree";
//import contractJSON from '../../static/contracts.json';

const TREE_LEVELS = 20;


function Vote() {


  async function fetchContracts() {
    try {
      const response = await fetch("contracts.json");
      const data = await response.json();
      console.log("got contract.json")
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
    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );


 

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    //fetchContracts();
    //const contracts = await (await fetch("contracts.json")).json();
    const contracts = {"mimc":"0x5FbDB2315678afecb367f032d93F642f64180aa3","verifier":"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","zktreevote":"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"};
    console.log("voted for" , candidate, signer, contracts, commitment)

    const contract = new ethers.Contract(contracts.zktreevote, abi, signer);
    const cd = await calculateMerkleRootAndZKProof(
      contracts.zktreevote,
      signer,
      TREE_LEVELS,
      commitment,
      "verifier.zkey"
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
    } catch (e) {
      alert(e.reason);
      console.log('eee')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <h2 className="text-2xl font-bold mb-8">Vote for Your Candidate</h2>
    <div className="flex flex-col space-y-4">
      <button onClick={() => handleVote(1)} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Candidate 1</button>
      <button onClick={() => handleVote(2)} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Candidate 2</button>
      <button onClick={() => handleVote(3)} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Candidate 3</button>
      <button onClick={() => handleVote(4)} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Candidate 4</button>
      <button onClick={() => handleVote(5)} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Candidate 5</button>
    </div>
  </div>  )
}

export default Vote