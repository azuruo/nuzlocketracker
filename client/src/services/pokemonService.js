import axios from 'axios';

const API_URL = '/api/pokemon';

export const fetchPokemons = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPokemon = async (pokemonData) => {
  const response = await axios.post(API_URL, pokemonData);
  return response.data;
};

export const updatePokemon = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deletePokemon = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};