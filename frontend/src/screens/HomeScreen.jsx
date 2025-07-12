import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePatientStore } from '../store/patientStore';

export default function HomeScreen() {
  const { patientData } = usePatientStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {patientData?.name || 'Patient'}!
      </Text>
      <Text>Email: {patientData?.email}</Text>
      <Text>Phone: {patientData?.phone}</Text>
      <Text>Address: {patientData?.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
});
