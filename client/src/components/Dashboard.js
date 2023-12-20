import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPokemonForm from './AddPokemonForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const [box, setBox] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBox = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const boxResponse = await axios.get('/api/pokemonBoxes', config);

        setBox(boxResponse.data);
      } catch (err) {
        setError(err.response?.data.message || 'An error occurred');
      }
    };

    setIsLoading(true);
    fetchBox().finally(() => setIsLoading(false));
  }, []);

  const handleAddPokemonToBox = (newPokemon) => {
    if (box.length >= 30) {
      alert('Box is full!'); // Notify user if the box is full
      return;
    }
    setBox(currentBox => [newPokemon, ...currentBox]);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <AddPokemonForm onPokemonAdd={handleAddPokemonToBox} />
    </Container>
  );
};

export default Dashboard;
