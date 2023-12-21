import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h2" gutterBottom>
        Welcome to Pokémon App
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Track your progress!
      </Typography>
      <div>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 3 }}>
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/register">
          Register
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;
