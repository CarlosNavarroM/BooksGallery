import axios from 'axios';

// Determinar la base URL dependiendo del entorno
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_DEV;

const apiClient = axios.create({
  baseURL
});

export default apiClient;
