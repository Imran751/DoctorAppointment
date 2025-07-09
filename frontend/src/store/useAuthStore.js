import { create } from 'zustand';
import { loginUser, registerUser } from '../api/authApi';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // 🔐 Login function
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(email, password);
      set({
        token: data.access_token,
        user: email,
        loading: false,
      });
    } catch (err) {
      set({
        error: err,
        loading: false,
      });
    }
  },

  // 📝 Register function
  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(email, password);
      set({
        token: data.access_token,
        user: email,
        loading: false,
      });
    } catch (err) {
      set({
        error: err,
        loading: false,
      });
    }
  },

  // 🚪 Logout function
  logout: () => {
    set({
      user: null,
      token: null,
      error: null,
      loading: false,
    });
  },
}));

export default useAuthStore;
