import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { usePatientStore } from '../store/patientStore';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const { registerPatient } = usePatientStore();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError(null); // Clear error on new input
  };

  const validate = () => {
    const { name, email, phone, address, password } = form;

    if (!name || !email || !phone || !address || !password) {
      return 'All fields are required.';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return null; // ✅ No errors
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    try {
      await registerPatient(form);
      navigation.replace('HomeScreen');
    } catch (err) {
      console.error('Registration failed:', err);

      if (err?.response?.data?.detail) {
        setError(err.response.data.detail); // Backend error message
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as Patient</Text>

      {['name', 'email', 'phone', 'address', 'password'].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          onChangeText={(val) => handleChange(key, val)}
          secureTextEntry={key === 'password'}
          keyboardType={
            key === 'phone' ? 'phone-pad' : key === 'email' ? 'email-address' : 'default'
          }
          autoCapitalize={key === 'email' || key === 'password' ? 'none' : 'words'}
          autoComplete={key}
        />
      ))}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Register" onPress={handleSubmit} />

      <Text style={styles.switchText}>Already registered?</Text>
      <Button title="Go to Login" onPress={() => navigation.replace('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
