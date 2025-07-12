import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { usePatientStore } from '../store/patientStore';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // 👈 error state
  const { loginPatient } = usePatientStore();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError(null); // Clear error as user types
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      await loginPatient(form);
      navigation.replace('HomeScreen');
    } catch (err) {
      console.error('Login failed:', err);

      // Try to extract readable error message
      if (err?.response?.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>

      {['email', 'password'].map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          secureTextEntry={key === 'password'}
          onChangeText={(val) => handleChange(key, val)}
          autoCapitalize="none"
          keyboardType={key === 'email' ? 'email-address' : 'default'}
        />
      ))}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Login" onPress={handleSubmit} />

      <Text style={{ textAlign: 'center', marginVertical: 10 }}>New user?</Text>
      <Button title="Go to Register" onPress={() => navigation.replace('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
