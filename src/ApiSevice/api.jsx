import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Gestion de l'expiration du token
api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login";
    }
    return Promise.reject(error);
  },
);

export const login = (credentials) => api.post("/user/login", credentials);
export const getDashboard = () => api.get("/dashboard");
export const getProducts = () => api.get("/products/admin");
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getCategories = () => api.get("/categories");
export const postProduct = (formData) =>
  api.post("/products/store", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default api;
