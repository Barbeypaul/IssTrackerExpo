import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';
import Walpaper from '../assets/51493637286_d73e9cfc30_o.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { faSatellite } from '@fortawesome/free-solid-svg-icons'


class Home extends React.Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.Container}>
      <ImageBackground style={styles.Walpaper} source={Walpaper} resizeMode="cover">
      <View style={styles.ViewHome}>
      
      <TouchableOpacity  onPress={() => navigation.push("BottomMenu")}  style={styles.Button}><Text style={styles.TextButton}>Ready to explore <FontAwesomeIcon style={{color: 'black'}} icon={ faSatellite } /></Text></TouchableOpacity >
      </View>
      </ImageBackground>
      </View>
    )
    
    
  }
}
const styles = StyleSheet.create({
  Container: {
     flex: 1,
  },
  Walpaper:{
    flex: 1,
    justifyContent: "center"
  },
  ViewHome:{
     alignItems: 'center', 
     justifyContent: 'center', 
  },
  Button:{
    padding:20,
    backgroundColor: 'white',
    width: 'auto',
    borderRadius: 50,
  },
  TextButton:{
     fontFamily:"Roboto",
    fontWeight: "bold",
    fontSize:18,
    textAlign:"center",
    color: 'black'
  },
  })
export default Home