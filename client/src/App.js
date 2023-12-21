import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage'; // Make sure the path is correct

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is logged in when the app loads
  useEffect(() => {
    let isMounted = true; // flag to indicate the component is still mounted

    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token && isMounted) {
        try {
          // Replace with your actual verify endpoint
          const response = await axios.get('/api/users/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // If the verification is successful, keep the user logged in
          setLoggedIn(true);
        } catch (error) {
          // If verification fails, log the user out
          localStorage.removeItem('token');
          setLoggedIn(false);
        }
      }
    };

    verifyToken();

    // Cleanup function to set the flag to false when the component unmounts
    return () => {
      isMounted = false;
    };
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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Navigate replace to="/login" />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;