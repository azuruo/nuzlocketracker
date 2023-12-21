import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
      alert('Registration successful');
    } catch (error) {
      alert(
        'Registration failed: ' +
          (error.response.data.message || 'Unknown error')
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            name="email"
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
