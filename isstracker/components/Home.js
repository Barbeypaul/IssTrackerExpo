import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Home({ navigation }) {
  return (
      <View style={{ height: '100%',  flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={styles.styleTitre}>Start to track Iss !</Text>
      <View  style={styles.styleBtn}>
      <Button
        title="Explore 🔭"
        color="black"
        onPress={() => navigation.push('TrackerIss')}
      />
      </View>
      </View>
      )
}
const styles = StyleSheet.create({
  styleBtn: {
    width: 248,
    borderRadius: 50,
    overflow: "hidden",
    fontFamily:"Roboto",
  fontWeight: "bold",
   fontSize:18,
  textAlign:"center",
  },
  styleTitre: {
    width: 288,
   height: 119,
   fontSize:40,
  fontFamily:"Roboto",
  fontWeight: "bold",
  textAlign:"center",
}
});

export default Home;