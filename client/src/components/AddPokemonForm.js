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
        // Add to Box
        const responseBox = await axios.post('/api/addPokemonToBox', { pokemon: selectedPokemon });
        console.log('Added to Box:', responseBox.data);
  
        // Call the onPokemonAdd prop to add the Pokémon to the Box in the parent component
        onPokemonAdd(selectedPokemon);
      } catch (error) {
        console.error('Failed to add Pokémon to Box:', error);
      }
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
