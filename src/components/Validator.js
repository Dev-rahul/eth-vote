import React, { useState } from "react";
import * as ethers from "ethers";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Validator() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#8985f2",
      },
      secondary: {
        main: "#ff4843",
      },
    },
  });

  const [commitment, setCommitment] = useState("");
  const [uniqueHash, setUniqueHash] = useState("");

  const handleCommitment = (e) => setCommitment(e.target.value);

  const sendToBlockchain = async () => {
    const abi = [
      "function registerCommitment(uint256 _uniqueHash, uint256 _commitment)",
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    console.log("first", uniqueHash, commitment);
    try {
      await contract.registerCommitment(uniqueHash, commitment);
      console.log('Commitment sucessfully send to blockchain');
      alert('Commitment sucessfully send to blockchain');
    } catch (e) {
      alert(e.reason + '\n\nMake sure you have selected the correct wallet address on metamask. (This happens in cases where multiple accounts are connected on metamask) ')
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex items-center justify-center  bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Validator Tool
          </h1>
          <TextField
            sx={{ input: { color: "white" } }}
            label="Commitment"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleCommitment}
            value={commitment}
          />
          <TextField
            sx={{ input: { color: "white" } }}
            label="Unique Hash"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUniqueHash(e.target.value)}
            value={uniqueHash}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendToBlockchain}
            fullWidth
            sx={{ mt: 4 }}
          >
            Send To Blockchain
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Validator;
