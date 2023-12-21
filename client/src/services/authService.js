import axios from 'axios';

export const verifyUser = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.get('/api/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post('/api/users/login', formData);
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
