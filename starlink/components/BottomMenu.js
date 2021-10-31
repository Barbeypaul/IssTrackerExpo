import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSatellite } from '@fortawesome/free-solid-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MapTrackStarlink from './MapTrackStarlink'
import IssTracker from './IssTracker'
import HubbleTracker from './HubbleTracker'
import Live from './Live'


class BottomMenu extends React.Component {
  render() {
const Tab = createMaterialBottomTabNavigator();
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="white"
        inactiveColor="#979797"
        barStyle={{ backgroundColor: 'black' }}
        >
         
        <Tab.Screen name="Iss" component={IssTracker} options={{
          tabBarOptions: { showLabel: false },
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon color={color}  icon={ faSatellite } />
          ),
        }}/>
        <Tab.Screen name="StarLink" component={MapTrackStarlink} options={{
          tabBarOptions: { showLabel: false },
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon color={color}  icon={ faSatellite } />
          ),
        }}/>
        <Tab.Screen name="Hubble" component={HubbleTracker} options={{
          tabBarOptions: { showLabel: false },
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon color={color}  icon={ faSatellite } />
          ),
        }}/>
         <Tab.Screen name="Live" component={Live} options={{
          tabBarOptions: { showLabel: false },
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon color={color}  icon={ faUserAstronaut } />
          ),
        }}/>
      </Tab.Navigator>
   
    )
    
    
  }
}


export default BottomMenu;