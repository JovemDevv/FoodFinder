import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-finder.onrender.com', // Certifique-se de que a URL está correta
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
