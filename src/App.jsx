
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/Products";
import Categorie from "./pages/Categorie";
//import CategoryDetail from "./pages/CategoryDetail";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import url from "./utils/url";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import OrdersPage from "./pages/Orders";
import OrderDetail from "./components/OrderDetailsModal";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path={`${url}`}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={`${url}/products`} element={<ProductPage />} />
          <Route path={`${url}/categories`} element={<Categorie />} />
          {/* <Route
            path={`${url}/categories/details/:category}`}
            element={<CategoryDetail />}
          /> */}
          <Route path={`${url}/product/:id`} element={<ProductDetail />} />
          <Route path={`${url}/orders`} element={<OrdersPage />} />
          <Route path={`${url}/orders/:id`} element={<OrderDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
