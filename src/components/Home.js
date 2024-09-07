import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  CheckIcon,
  ChartBarIcon,
  FingerPrintIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline"; // Import necessary icons
import AppContext from "../contexts/AppContext";

function Home() {
  const { validatorAddress, isConnected } = useContext(AppContext);


  return (
    <div className="flex items-center justify-center bg-gray-900 text-white pt-4 w-full">
      {isConnected ? (
        <div className="flex flex-col space-y-4 w-80">
          {validatorAddress !== null ? (
            <Link to="/validator">
              <button className="flex items-center space-x-2 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium shadow-md transition-transform transform hover:scale-105">
                <CheckIcon className="w-5 h-5" />
                <span>Validator Tool</span>
              </button>
            </Link>
          ) : null}

          {validatorAddress !== null ? (
            <Link to="/control">
              <button className="flex items-center space-x-2 w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium shadow-md transition-transform transform hover:scale-105">
                <WrenchIcon className="w-5 h-5" />
                <span>Poll Control</span>
              </button>
            </Link>
          ) : null}

          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mx-2" ></hr>

          <Link to="/register">
            <button className="flex items-center space-x-2 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow-md transition-transform transform hover:scale-105">
              <UserIcon className="w-5 h-5" />
              <span>Register</span>
            </button>
          </Link>

          <Link to="/vote">
            <button className="flex items-center space-x-2 w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow-md transition-transform transform hover:scale-105">
              <FingerPrintIcon className="w-5 h-5" />
              <span>Vote</span>
            </button>
          </Link>
          <Link to="/results">
            <button className="flex items-center space-x-2 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-medium shadow-md transition-transform transform hover:scale-105">
              <ChartBarIcon className="w-5 h-5" />
              <span>Results</span>
            </button>
          </Link>
        </div>
      ) : (
        <div> Please connect your account to metamask</div>
      )}
    </div>
  );
}

export default Home;
