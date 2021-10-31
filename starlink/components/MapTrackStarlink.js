import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");
const { getSatelliteName } = require("tle.js/dist/tlejs.cjs");

import starlinkIcon from '../assets/satellite-icon-png-19.png'

class MapTrackStarlink extends React.Component {
  state = {
    TLEState : [],
    starlinkLocation : false,
    starlinkTLE : null,
    starlinkLatLng : [],
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

  TLEboucle(){
    const starlinkLatLng = []
    const optionalTimestampMS = Date.now();
    const TLEState = this.state.TLEState
    for(var i=0; i< TLEState.length; i++){
          const TLE = TLEState[i].id
          const latLonObj =  {location : { latitude :   getLatLngObj(TLE, optionalTimestampMS).lat, longitude : getLatLngObj(TLE, optionalTimestampMS).lng }, satelliteName : getSatelliteName(TLE)}
          starlinkLatLng.push(latLonObj)
    }
          this.setState({
          starlinkLatLng : starlinkLatLng,
          starlinkLocation : true,
        })
    
    
  }
  componentDidMount() {
    
 fetch("https://opensheet.vercel.app/17DvzpyfVxVd5gB-uInLpSh77I_jAyL2HL6l1wEgbLA4/Feuille+1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            TLEState: result
          });
          console.log(this.state.TLEState.length)
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
         console.log(error)
        }
      )
    this._getLoacation();
    const boucle = setInterval(()=> {this.TLEboucle();}, 2000)
  }
  componentWillUnmount(){
    clearInterval(this.TLEboucle());
    this.setState({
      locationIss : false,
    })
  }
  
  render() {
    return( 
      <View style={styles.Container}>
          <MapView style={styles.MapView} >
          { this.state.starlinkLocation ?  
              this.state.starlinkLatLng.map((value, index)=> (
                            <Marker  key={value.satelliteName} coordinate={value.location}>
                                <Image source={starlinkIcon} style={{height: 20, resizeMode: "contain" }} />
                            </Marker>
              ))
            
          : null
                }
                 { this.state.isLocation ? 
          <Marker  key="idLocation" coordinate={this.state.location}></Marker>    
        : null
          }
       </MapView>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  FontStyle: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
  },
  MapView: {
    flex: 9,
  },
  InfoMation: {
    top: '65%',
    height: '35%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
const jsonMapDark = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];
export default MapTrackStarlink;
