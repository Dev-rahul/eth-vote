import React, { useState } from "react";
import * as ethers from "ethers";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import QrReader from "react-qr-reader-es6";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

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

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const [commitment, setCommitment] = useState("");
  const [uniqueHash, setUniqueHash] = useState("");

  const [scannerState, setScannerState] = useState(false);

  const handleChange = (event) => {
    setScannerState(event.target.checked);
  };

  const handleScan = (data) => {
    if (data) {
      
      if(data.length <= 77) {
        setCommitment(data);
        setScannerState(false);

      } else {
        alert("Invalid QR Code");
      }
  
    } 
  };

  const handleError = (err) => {
    console.error(err);
  };

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
      console.log("Commitment sucessfully send to blockchain");
      alert("Commitment sucessfully send to blockchain");
    } catch (e) {
      alert(
        e.reason +
          "\n\nMake sure you have selected the correct wallet address on metamask. (This happens in cases where multiple accounts are connected on metamask) "
      );
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex items-center justify-center w-full  bg-gray-900 p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Validator Tool
          </h1>
          <div>
            <div className="flex justify-center items-center">
              <Android12Switch
               
                checked={scannerState}
                onChange={handleChange}
              />
              QR Scanner
            </div>
            {scannerState ? (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
            ) : null}
          </div>

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
