import React from 'react'
import * as ethers from "ethers";
import { calculateMerkleRootAndZKProof } from "zk-merkle-tree";
import zKey from '../static/Verifier.zkey'

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
    const contracts = await (await fetch("contracts.json")).json();
    //const contracts = {"mimc":"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9","verifier":"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707","zktreevote":"0x0165878A594ca255338adfa4d48449f69242Eb8F"};
    console.log("contracts" , contracts, commitment)

    console.log("voted for" , candidate, signer, contracts, commitment)
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