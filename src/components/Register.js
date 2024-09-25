import React, { useEffect, useState, useRef } from "react";
import { generateCommitment } from "zk-merkle-tree";
import QRCode from "react-qr-code";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

function Register() {
  const [commitment, setCommitment] = useState(null);

  const downloadRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    var commit = JSON.parse(localStorage.getItem("zktree-vote-commitment"));
    console.log(commit, "commit");
    setCommitment(commit);
    if (!commit) {
      commit = await generateCommitment();
      localStorage.setItem("zktree-vote-commitment", JSON.stringify(commit));
    }
    // const qrcodeDataUrl = await QRCode.toDataURL(commit.commitment);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commitment.commitment);
    alert("Successfully copied to the clipboard");
  };

  const resetCommitment = () => {
    localStorage.removeItem("zktree-vote-commitment");
    init();
  };

  const download = () => {
    const qr = downloadRef.current;
    if (!qr) {
      return console.log("Something went wrong");
    }

    const svgData = new XMLSerializer().serializeToString(qr);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);
      const pngFile = canvas.toDataURL("image/png", 1.0);

      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode";
      downloadLink.href = `${pngFile}`;
      downloadLink.target = "_blank";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      downloadLink.remove();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const [switchState, setSwitchSate] = useState(false);

  const handleChange = (event) => {
    setSwitchSate(event.target.checked);
  };

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

  return (
    <>
      <div className="flex flex-col items-center space-y-8 p-6 bg-transparent rounded-lg w-full max-w-md mx-auto text-center">
        <div className="text-2xl font-bold text-white">Register</div>

        <div className="flex justify-center items-center">
          Commitment QR
          <Android12Switch checked={switchState} onChange={handleChange} />
          Complete QR
        </div>
        <div className="flex flex-col items-center space-y-4">
          {commitment ? (
            <div className="p-4 bg-white">
              {" "}
              <QRCode
                ref={downloadRef}
                value={
                  switchState
                    ? JSON.stringify(commitment)
                    : commitment?.commitment
                }
              />{" "}
            </div>
          ) : null}
          <button
            onClick={download}
            className=" bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Download
          </button>
          <br></br>
          {switchState ? (
            <div
              className="p-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">Warning!</span> Complete QR contains
              the full commitment data. Use with caution.
            </div>
          ) : null}

          <br></br>

          <button
            onClick={init}
            className="w-48 h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Register commitment
          </button>

          <button
            onClick={resetCommitment}
            className="w-48 h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Clear commitment
          </button>

          <button
            onClick={copyToClipboard}
            className="w-48 h-12 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Copy commitment
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
