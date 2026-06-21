import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/products/AdminProducts";
import CreateProduct from "./admin/products/CreateProduct";
import EditProduct from "./admin/products/EditProduct";
import AdminCategories from "./admin/categories/AdminCategories";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

import SliderManagement from "./admin/sliders/SliderManagement";
import PromotionManagement from "./admin/promotions/PromotionManagement";
import PromotionProducts from "./pages/PromotionProducts";

import AdminSignin from "./pages/AdminSignin";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckoutPage.jsx";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import "./App.css";
import Loading from "./pages/Loading.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <Routes>

      {/* Default */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* User Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/promotions/:id" element={<PromotionProducts />}
/>

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders/my-orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminSignin />} />
      {/* Loading Screen */}
      <Route path="/loading" element={<Loading />} />
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

      <Route
        path="/admin/promotions"
        element={
          <AdminProtectedRoute>
            <PromotionManagement />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/sliders"
        element={
          <AdminProtectedRoute>
            <SliderManagement />
          </AdminProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;