import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1. Intercepteur de REQUÊTE : Ajoute le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Intercepteur de RÉPONSE : Gère les erreurs globales (401, 403)
api.interceptors.response.use(
  (response) => response, // Si tout va bien, on laisse passer la réponse
  (error) => {
    // Si l'API renvoie 401 (Non authentifié)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // On redirige proprement vers le login
      // Utiliser window.location.href est radical mais efficace pour vider l'état React
      window.location.href = "/login"; 
    }
    
    // On peut aussi gérer le 403 ici si on veut un comportement global
    if (error.response?.status === 403) {
       console.error("Accès interdit : vous n'avez pas les droits.");
    }

    return Promise.reject(error);
  }
);

// --- Endpoints ---
export const login = (credentials) => api.post("/user/login", credentials);
export const getDashboard = () => api.get("/dashboard");
export const getProducts = () => api.get("/products/admin");
export const getCategories = () => api.get("/categories");
export const getProductDetails = (id) => api.get(`/products/details/admin/${id}`);

export const postProduct = (formData) =>
  api.post("/products/store", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const putProduct = (id, formData) =>
  api.post(`/products/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) => api.delete(`/products/destroy/${id}`);
export const getOrders = () => api.get("/sales/all/admin");
export const updateOrder = (reference, status) => api.put(`/sales/update/${reference}`, { status } , {
    headers: { "Content-Type": "application/json" , Accept: "application/json" },
  });

export default api;