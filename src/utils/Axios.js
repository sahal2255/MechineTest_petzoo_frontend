// utils/Axios.js
import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
console.log('Backend URL:', url);

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
