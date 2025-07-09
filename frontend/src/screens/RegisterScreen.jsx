// src/screens/RegisterScreen.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  return (
    <View style={styles.container}>
      <Icon name="person-add-alt" size={60} color="#6200ee" style={styles.icon} />
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
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

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        left={<TextInput.Icon icon="lock-check" />}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => console.log('Register pressed')}
        style={styles.button}
      >
        Register
      </Button>

      <Text
        onPress={() => navigation.goBack()}
        style={styles.link}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  icon: { alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, padding: 5 },
  link: { marginTop: 20, textAlign: 'center', color: '#6200ee' },
});
