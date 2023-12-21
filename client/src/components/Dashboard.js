// hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import PokemonBox from './PokeCard';
import AddPokemonForm from './AddPokemonForm';

// services
import { getUserBox } from '../services/pokemonBoxesService';

const Dashboard = ({ handleLogout }) => {
  // Accept setLoggedIn as a prop
  const [boxPokemons, setBoxPokemons] = useState([]);
  const [error, setError] = useState(null); // Added error state
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Added navigate hook

  useEffect(() => {
    const fetchBox = async () => {
      try {
        const userBox = await getUserBox();
        setBoxPokemons(userBox?.pokemons);
      } catch (error) {
        console.error('Error fetching box:', error);
        setError(error.response?.data.message || 'An error occurred'); // Set error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchBox();
  }, []);

  const handleAddPokemonToBox = (updatedBox) => {
    if (boxPokemons.length >= 30) {
      alert('Box is full!');
      return;
    }

    setBoxPokemons(updatedBox.pokemons);
    // setBoxPokemons((currentBox) => [newPokemon, ...currentBox]);
  };

  const onLogoutClick = () => {
    handleLogout(); // Call handleLogout prop
    navigate('/'); // Navigate to home page
  };

  // Render loading state
  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
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
      <Button
        variant="contained"
        color="secondary"
        onClick={onLogoutClick}
        sx={{ mb: 2 }}
      >
        Log Out
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <AddPokemonForm onPokemonAdd={handleAddPokemonToBox} />
      <PokemonBox box={boxPokemons} />
      {/* Render the PokemonBox component here */}
    </Container>
  );
};

export default Dashboard;
