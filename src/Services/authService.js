import axios from "axios";

const BASE_URL = "http://localhost:8080";

const AUTH_API_BASE_URL = `${BASE_URL}/auth`;
const ADMIN_API_BASE_URL = `${BASE_URL}/admin`;

/* ================= USER AUTH ================= */

// Signup
export const signupUser = (user) =>
  axios.post(`${AUTH_API_BASE_URL}/signup`, user);

// Login
export const loginUser = (credentials) =>
  axios.post(`${AUTH_API_BASE_URL}/login`, credentials);


/* ================= ADMIN AUTH ================= */

// Admin Login
export const adminLogin = (adminData) =>
  axios.post(`${ADMIN_API_BASE_URL}/login`, adminData);
