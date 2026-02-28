import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/products/AdminProducts";
import CreateProduct from "./admin/products/CreateProduct";
import EditProduct from "./admin/products/EditProduct";
import AdminCategories from "./admin/categories/AdminCategories";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

import AdminSignin from "./pages/AdminSignin";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import "./App.css";

function App() {
  return (
    <Routes>

      {/* Default */}
      <Route path="/" element={<Navigate to="/signup" />} />

      {/* User Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminSignin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products/create"
        element={
          <AdminProtectedRoute>
            <CreateProduct />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/products/edit/:id"
        element={
          <AdminProtectedRoute>
            <EditProduct />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminProtectedRoute>
            <AdminCategories />
          </AdminProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;