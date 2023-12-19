import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* Define other routes here */}
            {/* <Route exact path="/" component={Home} /> */}
            {/* Add a default route for unknown paths */}
            {/* <Route component={NotFound} /> */}
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;