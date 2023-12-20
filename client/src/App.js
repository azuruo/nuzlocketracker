import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            {loggedIn ? (
              // If logged in, show log-out button
              <>
                <Link to="/dashboard" className="App-link">Dashboard</Link>
                <Link to="/teams" className="App-link">Teams</Link>
                <Link to="/boxes" className="App-link">Boxes</Link>
                <button onClick={handleLogout} className="App-link">Log Out</button>
              </>
            ) : (
              // If not logged in, show login and register links
              <>
                <Link to="/login" className="App-link">Login</Link>
                <Link to="/register" className="App-link">Register</Link>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard"element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
