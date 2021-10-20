import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Image, TouchableOpacity  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'


class ButtonsNav extends React.Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={styles.ButtonsNav}>
        <TouchableOpacity   onPress={() => this.props.Navigation('TrackerIss')} style={styles.Button}><Text style={styles.FontButton}>Track <FontAwesomeIcon icon={ faGlobeEurope } />
</Text></TouchableOpacity >
        <TouchableOpacity  onPress={() => this.props.Navigation('Live')}  style={styles.Button}><Text style={styles.FontButton}>Live <FontAwesomeIcon icon={ faUserAstronaut } /></Text></TouchableOpacity >
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  ButtonsNav:{
    flexDirection:"row",
    position:"absolute",
    left:20,
    top:40
  },
  Button:{
    margin:10,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:"white",
    borderRadius:50,
    
  },
  FontButton:{
    fontFamily:"Roboto",
    fontWeight: "bold",
    fontSize:18,
    textAlign:"center",
  }
  
 })
export default ButtonsNav