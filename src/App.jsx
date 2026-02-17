import { Routes, Route, Navigate } from "react-router-dom";
import AdminSignin from "./AdminSignin";
import Signup from "./Signup";
import Signin from "./Signin";
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

    </Routes>
  );
}

export default App;
