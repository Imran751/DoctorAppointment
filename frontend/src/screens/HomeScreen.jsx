import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { usePatientStore } from '../store/patientStore';

export default function HomeScreen({ navigation }) {
  const { patientData, logout } = usePatientStore();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Register'); // or 'Login' if you prefer
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {patientData?.name || 'Patient'}!
      </Text>
      <Text>Email: {patientData?.email}</Text>
      <Text>Phone: {patientData?.phone}</Text>
      <Text>Address: {patientData?.address}</Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
});
