import React,{useState} from 'react'
import * as ethers from "ethers";
import { calculateMerkleRootAndZKProof } from "zk-merkle-tree";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
function Validator() {

    // const commitment = JSON.parse(
    //     localStorage.getItem("zktree-vote-commitment")
    //   );

    const theme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#8985f2',
          },
          secondary: {
            main: '#ff4843',
          },
        },
        typography: {
          fontFamily: 'Poppins',
        },
      });

    const [commitment, setCommitment] = useState('');
    const [uniqueHash, setUniqueHash] = useState('');

    const handleCommitment = (e) => setCommitment(e.target.value);



    const sendToBlockchain = async () => {
        const abi = [
          "function registerCommitment(uint256 _uniqueHash, uint256 _commitment)",
        ];
        const provider = new ethers.providers.Web3Provider(
          (window).ethereum
        );
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contracts = await (await fetch("contracts.json")).json();
        const contract = new ethers.Contract(contracts.zktreevote, abi, signer);
        if (!commitment) {
          alert("Commitment is required");
          return;
        }
        if (!uniqueHash) {
          alert("Unique hash is required");
          return;
        }
        console.log('first', uniqueHash, commitment)
        try {
          await contract.registerCommitment(uniqueHash, commitment);
        } catch (e) {
            console.log(e)
        }
      }
  return (
    <ThemeProvider theme={theme}>
              <CssBaseline />

        <div>
        <TextField sx={{ input: { color: 'white' } }} label="Commitment" variant="outlined" onChange={handleCommitment} value={commitment} />
        <TextField sx={{ input: { color: 'white' } }} id="outlined-basic" label="Unique Hash" variant="outlined" onChange={(e)=>setUniqueHash(e.target.value)} value={uniqueHash} />

        </div>
        <Button onClick={sendToBlockchain}>Send To Blockchain</Button>
    </ThemeProvider>
  )
}

export default Validator