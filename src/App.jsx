import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/Products";
import Categorie from "./pages/Categorie";
import ProductDetail from "./pages/ProductDetail";
import CategoryDetail from "./pages/CategoryDetail";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import url from "./utils/url";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path ={ `${url}`} element = {<Dashboard />} />
          <Route path = {`${url}/products`} element = {<ProductPage />} />
          <Route path = {`${url}/categories`} element = {<Categorie />} />
          <Route path = {`${url}/product/:id`} element = {<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
