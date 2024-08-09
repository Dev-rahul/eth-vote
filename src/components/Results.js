import React,{useEffect, useState} from 'react'
import contractJSON from '../../static/contracts.json';

function Results() {

    useEffect(()=> {
        init()
    },[])

    
      const init = async () => {
        const abi = [
          "function getOptionCounter(uint _option) external view returns (uint)",
        ];
        const provider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = provider.getSigner();
        const contracts = JSON.parse(JSON.stringify(contractJSON));
        const contract = new ethers.Contract(contracts.zktreevote, abi, signer);
        for (let i = 0; i < 4; i++) {
          this.options[i] = (await contract.getOptionCounter(i + 1)).toString();
        }
        console.log(this.options[3]);
      }
  return (
    <div>Results</div>
  )
}

export default Results