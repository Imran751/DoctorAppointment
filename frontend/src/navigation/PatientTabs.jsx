// navigation/PatientTabs.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Text>Patient Home</Text>;
}

function ProfileScreen() {
  return <Text>Patient Profile</Text>;
}

export default function PatientTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
