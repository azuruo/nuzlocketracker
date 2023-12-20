import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email format is invalid');
            return;
        }
    
        try {
            const response = await axios.post('/api/users/register', {
                username, 
                email, 
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/');
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed: ' + (error.response.data.message || 'Unknown error'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
