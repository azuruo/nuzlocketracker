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
