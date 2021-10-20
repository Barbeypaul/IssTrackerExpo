import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Components
import Home from "./components/Home"
import TrackerIss from "./components/TrackerIss"
import Live from './components/Live'
// You can import from local files

// or any pure javascript modules available in npm

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
     <NavigationContainer> 
        <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TrackerIss" component={TrackerIss} />
        <Stack.Screen name="Live" component={Live} />
       </Stack.Navigator>
      </NavigationContainer>
  );
}

