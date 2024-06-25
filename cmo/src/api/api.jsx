import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') || '',
  },
});

export default api;
