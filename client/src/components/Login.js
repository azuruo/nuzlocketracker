import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      );
    };
    
    export default Login;
