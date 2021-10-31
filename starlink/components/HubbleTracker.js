import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");
const { getSatelliteName } = require("tle.js/dist/tlejs.cjs");

import HubbleIcon from '../assets/4612126.png'

class HubbleTracker extends React.Component {
  state = {
    TLEState : null,
    locationHubble : false,
    HubbleLatLngName : {},
    isLocation : false,
    location: {},
  }
  _getLoacation = async () => {
   const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location  :{ latitude :  location.coords.latitude, longitude : location.coords.longitude,  },
      isLocation : true,
    })
    // console.log(this.state.location)
  }
  componentDidMount() {
    
 fetch("https://opensheet.vercel.app/17DvzpyfVxVd5gB-uInLpSh77I_jAyL2HL6l1wEgbLA4/Feuille+1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            TLEState: result[0].Hubble,
            
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
         console.log(error)
        }
      )
    this._getLoacation();
    setInterval(()=> {this.TLEboucle();}, 2000)
  }
  componentWillUnmount(){
    clearInterval(this.TLEboucle());
    this.setState({
      locationIss : false,
    })
  }
  TLEboucle(){
    const optionalTimestampMS = Date.now();
    const TLE = this.state.TLEState
    const HubbleLatLngName =  {location : {latitude : getLatLngObj(TLE, optionalTimestampMS).lat, longitude : getLatLngObj(TLE, optionalTimestampMS).lng}, satelliteName : getSatelliteName(TLE)}
          this.setState({
          HubbleLatLngName : HubbleLatLngName,
          locationHubble : true,
        })
       
        // console.log(this.state.IssLatLngName.location)
  }
  render() {
    return( 
      <View style={styles.Container}>
          { this.state.locationHubble ?  
           <MapView style={styles.MapView} initialRegion={{
        latitude: this.state.HubbleLatLngName.location.latitude,
      longitude: this.state.HubbleLatLngName.location.longitude,
      latitudeDelta: 50,
      longitudeDelta: 50,
    }}> 
          <Marker  key="Hubble" coordinate={this.state.HubbleLatLngName.location}>
             <Image source={HubbleIcon} style={{height: 40, resizeMode: "contain" }} />
        </Marker>
        { this.state.isLocation ? 
          <Marker  key="idLocation" coordinate={this.state.location}></Marker>    
        : null
          }
        </MapView>      
          :      <MapView style={styles.MapView}>{ this.state.isLocation ? 
          <Marker  key="idLocation" coordinate={this.state.location}></Marker>    
        : null
          }</MapView>    
                }
                
       
    </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  MapView: {
    flex: 9,
  },
});

export default HubbleTracker;