
import { StyleSheet,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import Geocoder from 'react-native-geocoding';

//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StackActions } from '@react-navigation/native';

import 'react-native-gesture-handler';
import MapView,{Marker} from 'react-native-maps';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';

//import {styles} from './style';
const positions=
  [
    { coordinates: { latitude: -33.90357832213655, longitude: 151.20724629853837 },title:"Kingsford Clinic" },
    { coordinates: { latitude: -33.90640996710897,  longitude: 151.2085552165672 },title:"Smile Clinic" },
    { coordinates: { latitude: -33.90464687845884, longitude:  151.21001433830423 },title:"Staysafe Clinic" },
    { coordinates: { latitude: -33.90264687845884, longitude:  151.20701433830423 },title:"GoodFuture Clinic" },
    { coordinates: { latitude: -33.90564687845884, longitude:  151.2121433830423 },title:"Bala Clinic" },
    { coordinates: { latitude: -33.90964687845884, longitude:  151.2061433830423 },title:"Waterloo Clinic" },

  ];
export default function TelehealthMV({navigation}){
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const goInfo= () => {
    navigation.navigate("ClinicInfo")
  }
  return(
    <View style={styles.container}>  
      <View style = {styles.mapcontainer}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <TouchableOpacity onPress={() =>{
            navigation.dispatch(StackActions.pop(1))}}>
            <Image
            style = {{width:25,
                height:25,
                marginTop:18,
                marginLeft:20,}}
            source={require('../../images/icon/2/Arrow_left.png')}
            />
        </TouchableOpacity>
        <Text style={{color:'#006A71',
        fontSize:16,
        marginLeft:125,
        marginTop:23}}>服务地图</Text>
        </View>
      <View style ={{flexDirection:'row'}}>
      <TouchableOpacity >
      <Image style={{marginLeft:40,width:70,height:40}}
          source = {require('../../images/nearby.png')}
        />
      </TouchableOpacity>  
      <TouchableOpacity >
      <Image style = {{marginTop:4,width:80,height:38,marginLeft:190}}
        source= {require('../../images/today.png')}
      />
    </TouchableOpacity>
    </View>
      <MapView style={styles.map}
              showsUserLocation={true}
              initialRegion={{
                latitude: -33.90408588805963,
                longitude: 151.20831918216854,
                latitudeDelta: 0.012,
                longitudeDelta: 0.012,
              }}
              >

          {positions.map((item, index) => (
          <Marker key={index} title={item.title} coordinate={item.coordinates} onCalloutPress = {goInfo} />
        ))}
      </MapView>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 420,
    backgroundColor:"white",
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  mapcontainer:{
    ...StyleSheet.absoluteFillObject,
    height:400,width:400,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  map: {
    marginTop:20,
    width:420,
    height:700,
  },
  arrow_image:{
    marginTop:60,
    marginLeft:20,
    width:30,
    height:30,
  },
 });
