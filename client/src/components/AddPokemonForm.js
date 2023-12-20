import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const AddPokemonForm = ({ onPokemonAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const pokemon = {
        name: response.data.name,
        sprite: response.data.sprites.front_default,
      };
      onPokemonAdd(pokemon);
      setSearchTerm('');
    } catch (error) {
      console.error('Failed to fetch pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPokemon();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>Add</Button>
    </form>
  );
};

export default AddPokemonForm;
