import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // your FastAPI server

// 🔐 Register User
export const registerUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
    });
    return res.data; // { access_token, token_type }
  } catch (err) {
    throw err.response?.data?.detail || 'Registration failed';
  }
};

// 🔐 Login User
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return res.data; // { access_token, token_type }
  } catch (err) {
    throw err.response?.data?.detail || 'Login failed';
  }
};
