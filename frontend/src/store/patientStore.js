import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Replace with actual IP or domain (e.g. http://192.168.1.10:8000)
// const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = 'http://192.168.137.1:8000';


export const usePatientStore = create((set) => ({
  patientId: null,
  isRegistered: false,
  patientData: null,
  isLoading: true,

  registerPatient: async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/register-patient`, data);
      const id = res.data.patient_id;

      // Save data locally
      await AsyncStorage.setItem('patient_id', id);
      await AsyncStorage.setItem('patient_data', JSON.stringify(data));

      set({
        patientId: id,
        isRegistered: true,
        patientData: data,
      });
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  },

  loadSession: async () => {
    try {
      const id = await AsyncStorage.getItem('patient_id');
      const data = await AsyncStorage.getItem('patient_data');

      if (id) {
        set({
          patientId: id,
          isRegistered: true,
          patientData: data ? JSON.parse(data) : null,
        });
      }
    } catch (error) {
      console.error('Error loading session:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('patient_id');
    await AsyncStorage.removeItem('patient_data');
    set({ patientId: null, isRegistered: false, patientData: null });
  }
}));
