import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PokemonBox from './PokemonBox'; // Import the PokemonBox component
import AddPokemonForm from './AddPokemonForm';

const Dashboard = () => {
  const [box, setBox] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBox = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchBox();
  }, []);

  const handleAddPokemonToBox = (newPokemon) => {
    if (box.length >= 30) {
      alert('Box is full!');
      return;
    }
    setBox(currentBox => [newPokemon, ...currentBox]);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  // Render dashboard with Pokemon box
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <AddPokemonForm onPokemonAdd={handleAddPokemonToBox} />
      <PokemonBox box={box} /> {/* Render the PokemonBox component here */}
    </Container>
  );
};

export default Dashboard;
