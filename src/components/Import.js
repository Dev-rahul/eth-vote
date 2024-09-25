import React, { useState } from "react";
import QrReader from "react-qr-reader-es6";
import { useNavigate } from "react-router-dom";

function ImportRegistration() {
  const navigate = useNavigate();

  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);

      //alert("Invalid QR Code");
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleImport = () => {
    console.log("Importing to browser");
    const data = JSON.parse(qrData);
    console.log(data, "imported data");
    localStorage.setItem("zktree-vote-commitment", JSON.stringify(data));
    alert("Succesfully imported commitment to browser");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6 bg-transparent rounded-lg w-full max-w-md mx-auto text-center">
      <div className="text-2xl font-bold text-white">Scan QR to Import </div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {qrData && (
        <div>
          {" "}
          <div
            style={{ maxWidth: "500px" }}
            className="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">
              {qrData}
            </pre>
          </div>{" "}
          <button
            onClick={handleImport}
            className="w-48 mt-2 h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Import to Browser
          </button>
        </div>
      )}
    </div>
  );
}

export default ImportRegistration;
