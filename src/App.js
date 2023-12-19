import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            {/* Navigation Links */}
            <Link to="/login" className="App-link">Login</Link>
            <Link to="/register" className="App-link">Register</Link>
            {/* Add more navigation links if needed */}
          </nav>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/login" element={<Login />} /> {/* Use element prop */}
            <Route path="/register" element={<Register />} /> {/* Use element prop */}
            {/* Define other routes here */}
            {/* <Route path="/" element={<Home />} /> */}
            {/* Add a default route for unknown paths */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
