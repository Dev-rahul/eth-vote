import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <Link to="/">
          <h1 className="text-4xl font-bold mb-8">etherVote</h1>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default Layout;
