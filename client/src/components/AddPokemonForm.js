import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

const AddPokemonForm = ({ onPokemonAdd }) => {
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonByGeneration = async () => {
      if (selectedGeneration) {
        setLoading(true);
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/generation/${selectedGeneration.toLowerCase()}`);
          const pokemonData = response.data.pokemon_species.map((pokemon) => {
            return {
              name: pokemon.name,
              pokeapiId: pokemon.url.split('/')[6],
            };
          });
          setPokemonList(pokemonData);
        } catch (error) {
          console.error('Failed to fetch Pokémon:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPokemonByGeneration();
  }, [selectedGeneration]);

  const handlePokemonSelect = (event) => {
    const selectedPokemonName = event.target.value;
    const selectedPokemonData = pokemonList.find((pokemon) => pokemon.name === selectedPokemonName);
    setSelectedPokemon(selectedPokemonData);
  };

  const handleAddPokemon = async () => {
    if (selectedPokemon) {
      try {
        const token = localStorage.getItem('token'); // or however you have stored it
  
        const config = {
          headers: {
            'Authorization': `Bearer ${token}` // Use the retrieved token
          }
        };
  
        // Adjust the payload to match your server's expected format
        const responseBox = await axios.post('/api/pokemonBoxes/addPokemon', {
          pokeapiId: selectedPokemon.pokeapiId, // You need to make sure this property exists in selectedPokemon
          // ... include other properties if needed
        }, config);
  
        console.log('Added to Box:', responseBox.data);
  
        // Call the onPokemonAdd prop to add the Pokémon to the Box in the parent component
        onPokemonAdd(selectedPokemon);
      } catch (error) {
        console.error('Failed to add Pokémon to Box:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No Pokémon selected to add to the Box');
    }
  };

  return (
    <form>
      <TextField
        label="Select Pokémon Generation"
        select
        variant="outlined"
        fullWidth
        value={selectedGeneration}
        onChange={(e) => setSelectedGeneration(e.target.value)}
        disabled={loading}
      >
        <MenuItem value="1">Generation I</MenuItem>
        <MenuItem value="2">Generation II</MenuItem>
        <MenuItem value="3">Generation III</MenuItem>
        {/* Add more generations as needed */}
      </TextField>
      <TextField
        label="Select Pokémon"
        select
        variant="outlined"
        fullWidth
        value={selectedPokemon ? selectedPokemon.name : ''}
        onChange={handlePokemonSelect}
        disabled={loading}
      >
        {pokemonList.map((pokemon) => (
          <MenuItem key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleAddPokemon} disabled={!selectedPokemon}>
        Add to Box
      </Button>
    </form>
  );
};

export default AddPokemonForm;
