import axios from 'axios';

export const getUserBox = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get('/api/pokemonBoxes/userBox', config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removePokemonFromBox = async (boxId, pokemonId) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `/api/pokemonBoxes/${boxId}/${pokemonId}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
