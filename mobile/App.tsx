import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import TourScreen from './screens/TourScreen';
import MusicScreen from './screens/MusicScreen';
import MerchScreen from './screens/MerchScreen';
import ProfileScreen from './screens/ProfileScreen';
import ARScreen from './screens/ARScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tour') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Music') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            } else if (route.name === 'Merch') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#dc143c',
          tabBarInactiveTintColor: '#cccccc',
          tabBarStyle: {
            backgroundColor: '#0a0a0a',
            borderTopColor: '#2a2a2a',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'The Drinkers' }}
        />
        <Tab.Screen 
          name="Tour" 
          component={TourScreen}
          options={{ title: 'Koncerti' }}
        />
        <Tab.Screen 
          name="Music" 
          component={MusicScreen}
          options={{ title: 'Glasba' }}
        />
        <Tab.Screen 
          name="Merch" 
          component={MerchScreen}
          options={{ title: 'Trgovina' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
        <Tab.Screen 
          name="AR" 
          component={ARScreen}
          options={{ 
            title: 'AR',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
});
