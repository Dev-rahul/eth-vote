// src/Layout.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function Layout({ children }) {
  const { validatorAddress, isConnected, handleClick, truncatedAddress } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-1 bg-gray-800">
        <div className="flex-1"></div>
        <Link to="/">
        <img height={80} width={80} src='etherVote_1.png'></img>
          {/* <h1 className="text-4xl font-bold text-center">etherVote</h1> */}
        </Link>
        <div className="flex-1 flex justify-end">
          {isConnected ? (
            validatorAddress ? (
              <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded">
                <span className="font-medium">Validator:</span>
                <span className="ml-2 text-sm font-mono">{truncatedAddress}</span>
                <button
                  onClick={handleClick}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Logout"
                >
                  <ArrowPathIcon className="w-5 h-5 text-green-500" />
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
