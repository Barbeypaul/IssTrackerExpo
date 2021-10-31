import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './components/Home'
import BottomMenu from './components/BottomMenu'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer> 
        <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BottomMenu" component={BottomMenu} />
       </Stack.Navigator>
      </NavigationContainer>
  );
}

