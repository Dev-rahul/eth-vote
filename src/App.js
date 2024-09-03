import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Vote from './components/Vote';
import Layout from './components/Layout';
import Validator from './components/Validator';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/vote" element={<Layout><Vote /></Layout>} />
        <Route path="/results" element={<Layout><Results /></Layout>} />
        <Route path="/validator" element={<Layout><Validator /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;
