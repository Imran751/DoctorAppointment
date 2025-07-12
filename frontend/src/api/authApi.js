import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = 'http://192.168.137.1:8000';

export const registerUser = async (email, password, role) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
    role,
  });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return res.data;
};
