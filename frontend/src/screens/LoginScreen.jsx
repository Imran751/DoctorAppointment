import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/useAuthStore';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Extract correct values from Zustand
  const { login, loading, error, token } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);
  };

  // ✅ Navigate after successful login
  useEffect(() => {
    if (token) {
      navigation.replace('PatientTabs'); // Later: check user role here
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Icon name="doctor" size={60} color="#6200ee" style={styles.icon} />
      <Text style={styles.title}>Welcome!</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
        style={styles.input}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Login
      </Button>

      <Text
        onPress={() => navigation.navigate('Register')}
        style={styles.link}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  icon: { alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
  link: { marginTop: 20, textAlign: 'center', color: '#6200ee' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
