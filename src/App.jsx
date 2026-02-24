import { Routes, Route, Navigate } from "react-router-dom";
import AdminSignin from "./pages/AdminSignin";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/signup" />} />

      {/* Signup page */}
      <Route path="/signup" element={<Signup />} />

      {/* Signin page */}
      <Route path="/signin" element={<Signin />} />

      {/* Admin Signin page */}
      <Route path="/admin" element={<AdminSignin />} />

      {/* Home Page */}
      <Route path="/home" element={<Home />} />

      {/* Product Details Page */}
      <Route path="/product/:id" element={<ProductDetails />} />

    </Routes>
  );
}

export default App;
