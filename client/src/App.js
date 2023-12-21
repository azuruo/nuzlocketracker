// hooks
import React from 'react';
import useUser from './hooks/useUser';

// components
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// utils
import logo from './logo.svg';

// styles
import './App.css';

// views
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage'; // Make sure the path is correct

function App() {
  const { user, isAuthenticated, handleLogout, isAuthLoaded, handleLogin } =
    useUser();

  if (!isAuthLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {isAuthenticated && <div>user: {user?._id}</div>}
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
            {/* <Route
              path="/dashboard"
              element={<Dashboard handleLogout={handleLogout} />}
            /> */}

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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
