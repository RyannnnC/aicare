
import { StyleSheet,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import Geocoder from 'react-native-geocoding';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import 'react-native-gesture-handler';
import MapView from 'react-native-maps';

//import {styles} from './style';

export default function App(){
  return(
    <View style={styles.container}>
      <MapView style={{ flex: 1 }}>
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
