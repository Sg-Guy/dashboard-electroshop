import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Remplace par l'URL de ton backend
  headers: {
    'Content-Type': 'application/json',
  }
});

// Si tu as un token d'authentification, on peut l'ajouter ici plus tard
export const getDashboard = ()=>api.get ('/dashboard');
export const getProducts = () => api.get('/products');
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;