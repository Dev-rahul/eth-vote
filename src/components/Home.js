import React from 'react'
import {Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col space-y-4">
            <Link to="/register">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Register</button>
            </Link>
            <Link to="/vote">
              <button className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded">Vote</button>
            </Link>
            <Link to="/results">
              <button className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded">Result</button>
            </Link>
            <Link to="/validator">
              <button className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded">Validator Tool</button>
            </Link>
          </div>
    </div>
  )
}

export default Home