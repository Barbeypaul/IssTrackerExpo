import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import ButtonsNav from "./ButtonsNav"
import * as Location from 'expo-location';
import i18n from 'i18n-js';




import IssMarker from '../assets/space-station.png'
class TrackerIss extends React.Component {
  
   state = {
    coordinate: {},
    latitude: null,
    longitude: null,
    name:"",
    altitude:"",
    visibility:"",
    velocity:"",
    isLoaded: false,
    location: {},
    isLocation : false,
  }
  _getLoacation = async () => {
   const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location  :{ latitude :  location.coords.latitude, longitude : location.coords.longitude,  },
      isLocation : true,
    })
    console.log(location)
  }


 fetchApiIss(){
    fetch("https://api.wheretheiss.at/v1/satellites/25544").then(res => res.json()).then(
        (result) => {
          this.setState({
            isLoaded: true,
            coordinate :{ latitude :  result.latitude, longitude : result.longitude,  },
              latitude:  result.latitude,
              longitude: result.longitude,
              name:result.name,
              altitude:result.altitude,
              visibility:result.visibility,
              velocity:result.velocity,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      
  }
  componentDidMount(){
    this._getLoacation();
    setInterval(()=> {this.fetchApiIss();}, 5000)
  }
  
  Navigation = (Route) => {
    const { navigation } = this.props;
    navigation.push(Route)
  }
  render() {
   
    const { navigation } = this.props;
    return (
        <View style={{ height: '100%'}}>
      <MapView style={styles.MapView} initialRegion={{
        latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 50,
      longitudeDelta: 50,
    }}
    customMapStyle = { jsonMapDark }>

        { this.state.isLoaded ? <Marker  key="id" coordinate={this.state.coordinate}>
        
        <Image source={IssMarker} style={{height: 40, resizeMode: "contain" }} />
        </Marker>   
        : null
          }
           { this.state.isLoaded ? 
           <Circle center={this.state.coordinate} radius={1500000} strokeWidth={1} strokeColor = { 'white' }  />    
        : null
          }
           { this.state.isLocation ? 
          <Marker  key="idLocation" coordinate={this.state.location}></Marker>    
        : null
          }
          </MapView>
      <ButtonsNav Navigation={this.Navigation} style={{ zIndex: 5 }}></ButtonsNav> 
      <View  style={styles.InfoMation}>
        <View style={{ padding:10, borderBottomWidth:  1,  borderBottomColor:  '#C4C4C4' }}>
              <Text style={styles.FontStyle}>Station spatiale internationale</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
         <Text style={styles.FontStyle}>Localisation : France </Text>
        <Text style={styles.FontStyle}>Visibility : {this.state.visibility}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
          <Text  style={styles.FontStyle}>Altidude :   {Math.round(this.state.altitude* 100) / 100} km</Text>
        <Text  style={styles.FontStyle}>Vitesse : {Math.round(this.state.velocity* 100) / 100} m/s</Text>
        </View>
      </View>
      </View>
    )
    }
}
const styles = StyleSheet.create({
  FontStyle: {
   fontSize:15,
  fontFamily:"Roboto",
  fontWeight: "bold",
  color:"black"
  },
  MapView: {
    zIndex:0,
    position: "absolute",
    width: "100%",
    height:"70%"
  },
  InfoMation: {
    top: "65%",
    height:"35%",
    backgroundColor: "white",
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  }
});
const jsonMapStandard = []
const jsonMapDark = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

export default TrackerIss
