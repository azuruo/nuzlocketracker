// hooks
import React from 'react';
import useAuth from './hooks/useAuth';

// components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// utils
// import logo from './logo.svg';
import pokeball from './assets/images/pokeball.png';
// styles
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
// views
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage'; // Make sure the path is correct

function App() {
  const { handleLogout, isAuthLoaded, handleLogin } = useAuth();

  if (!isAuthLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <ButtonAppBar />

        <header className="App-header">
          <img src={pokeball} className="App-logo" alt="logo" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard handleLogout={handleLogout} />
                </PrivateRoute>
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
