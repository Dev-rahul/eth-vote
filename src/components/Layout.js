import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // Updated import path for v2



const abi = ["function isValidator(address _address) view returns (bool)"];

function Layout({ children }) {
  const [validatorAddress, setValidatorAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const truncatedAddress = useMemo(() => {
    if (!validatorAddress) return "";
    return `${validatorAddress.slice(0, 6)}...${validatorAddress.slice(-4)}`;
  }, [validatorAddress]);

  const handleClick = async () => {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      const addressList = [];

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("accounts", accounts);
        setIsConnected(true);
        for (let i = 0; i < accounts.length; i++) {
          const address = accounts[i];
          const isValidatorStatus = await isValidator(address); // Call isValidator for each address

          if (isValidatorStatus) {
            setValidatorAddress(address);
            console.log(`Address ${address} is a validator.`);
            break; // Stop the loop if the address is a validator
          } else {
            console.log(`Address ${address} is not a validator.`);
          }
        }
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const isValidator = async (address) => {
    const contracts = await (await fetch("contracts.json")).json();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contracts.zktreevote, abi, signer);

    try {
      const isValidator = await contract.isValidator(address);
      console.log(`Is ${address} a validator?`, isValidator);
      return isValidator;
    } catch (err) {
      console.error("Error checking validator status:", err);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between px-4 py-4 bg-gray-800">
        <div className="flex-1"></div>
        <Link to="/">
          <h1 className="text-4xl font-bold text-center">etherVote</h1>
        </Link>
        <div className="flex-1 flex justify-end">
          {isConnected ? (
            validatorAddress !== null ? (
              <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded">
                <span className="font-medium">Validator:</span>
                <span className="ml-2 text-sm font-mono">
                  {truncatedAddress}
                </span>

                <button
                  // onClick={onLogout}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Logout"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <span className="text-gray-400">User</span>
            )
          ) : (
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded"
            >
              Connect
            </button>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default Layout;
