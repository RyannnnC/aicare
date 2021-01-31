
import { StyleSheet,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import Geocoder from 'react-native-geocoding';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Info from './Scene/consumerInfo';
import ConsumerOrder from './Scene/consumerOrder';
import ConsumerIcon from "./Scene/consumerIcon";
import ConsumerDate from './Scene/consumerDate';
import ConsumerAddress from './Scene/consumerAdrress';
import ConsumerPayInfo from './Scene/consumerPayInfo';
import ConsumerPaySuccess from "./Scene/consumerPaySuccess";
import DataContext from './consumerContext';
import 'react-native-gesture-handler';

//import {styles} from './style';
const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      latitude:0,
      longitude:0,
      ad0:"",
      ad1:"",
      ad2:"",
      ad3:"",
      ad4:"",
      ad5:"",
      ad6:"",
    }

  }
  getData(){
    Geocoder.init("AIzaSyCXUX-a8NteFRhltP-WJ0npzFKiKiG8wb8"); // use a valid API key
    Geocoder.from(this.state.latitude, this.state.longitude)
		.then(json => {
            var addressComponent = json.results[0].address_components;
            this.setState({
              ad0:addressComponent[0].long_name,
              ad1:addressComponent[1].long_name,
              ad2:addressComponent[2].long_name,
              ad3:addressComponent[3].long_name,
              ad4:addressComponent[4].long_name,
              ad5:addressComponent[5].long_name,
              ad6:addressComponent[6].long_name,
            })
			alert("gps enabled, this is your address");
		})
		.catch(error => console.warn(error));
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=>{
        this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        });
      },

    )
  }
render() {
  return (
   <View style={styles.container}>
   {/*<MapView
      region={{
        latitude: this.state.latitude,
        longitude:this.state.longitude,
        latitudeDelta:0.015,
        longitudeDelta:0.021
      }}
      style = {styles.map}

    >
      <Marker coordinate = {this.state}/>
    </MapView>*/}
    <TouchableOpacity onPress = {()=>{this.getData()}}>
      <Text style = {{fontSize:20}}>get address</Text>
    </TouchableOpacity>
    <Text>{this.state.ad0}</Text>
    <Text>{this.state.ad1}</Text>
    <Text>{this.state.ad2}</Text>
    <Text>{this.state.ad3}</Text>
    <Text>{this.state.ad4}</Text>
    <Text>{this.state.ad5}</Text>
    <Text>{this.state.ad6}</Text>
    </View>
  );
}
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
export default App;
