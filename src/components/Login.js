import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        try {
            const response = await axios.post('/api/users/login', { username, password });
            localStorage.setItem('token', response.data.token); 
            // Redirect to user dashboard or home page here
            // history.push('/user-dashboard'); // Example redirection
        } catch (error) {
            alert('Login failed: Incorrect credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
