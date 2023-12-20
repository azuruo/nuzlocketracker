import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        try {
            const response = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token); 
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed: ' + (error.response?.data.message || 'Unknown error'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
