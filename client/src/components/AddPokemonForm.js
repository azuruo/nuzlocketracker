import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { romanize } from '../utils';

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
          const response = await axios.get(
            `https://pokeapi.co/api/v2/generation/${selectedGeneration.toLowerCase()}`
          );
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
    const selectedPokemonData = pokemonList.find(
      (pokemon) => pokemon.name === selectedPokemonName
    );
    setSelectedPokemon(selectedPokemonData);
  };

  const handleAddPokemon = async () => {
    if (selectedPokemon) {
      try {
        const token = localStorage.getItem('token'); // or however you have stored it

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use the retrieved token
          },
        };

        // Adjust the payload to match your server's expected format
        const responseBox = await axios.post(
          '/api/pokemonBoxes/addPokemon',
          {
            pokeapiId: selectedPokemon.pokeapiId,
            name: selectedPokemon.name,

            // we're not getting these from that api endpoint right now
            sprite: selectedPokemon.sprite,
            type: selectedPokemon.type,
            // ... include other properties if needed
          },
          config
        );

        console.log('Added to Box:', responseBox.data);

        // Call the onPokemonAdd prop to add the Pokémon to the Box in the parent component
        onPokemonAdd(responseBox.data.box);
      } catch (error) {
        console.error(
          'Failed to add Pokémon to Box:',
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error('No Pokémon selected to add to the Box');
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Select Pokémon Generation"
          select
          variant="outlined"
          fullWidth
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value)}
          disabled={loading}
          sx={{
            '.MuiInputLabel-root': {
              // Label style
              color: 'text.primary',
            },
            '.MuiOutlinedInput-root': {
              // Input field style
              bgcolor: 'background.paper',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
        >
          {/* <MenuItem value="1">Generation I</MenuItem>
          <MenuItem value="2">Generation II</MenuItem>
          <MenuItem value="3">Generation III</MenuItem>
          <MenuItem value="4">Generation IV</MenuItem>
          <MenuItem value="5">Generation V</MenuItem>
          <MenuItem value="6">Generation VI</MenuItem>
          <MenuItem value="7">Generation VII</MenuItem> */}

          {new Array(7).fill(null).map((_, index) => (
            <MenuItem key={index} value={String(index + 1)}>
              Generation {romanize(index + 1)}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Select Pokémon"
          select
          variant="outlined"
          fullWidth
          value={selectedPokemon ? selectedPokemon.name : ''}
          onChange={handlePokemonSelect}
          disabled={loading}
          sx={{
            '.MuiInputLabel-root': {
              color: 'text.primary',
            },
            '.MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
        >
          {pokemonList.map((pokemon) => (
            <MenuItem key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPokemon}
          disabled={!selectedPokemon}
          sx={{
            py: 1.5, // Padding Y
            px: 5, // Padding X
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'text.disabled',
            },
          }}
        >
          Add to Box
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddPokemonForm;
