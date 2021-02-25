import React, { Component } from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,ScrollView } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import DataContext from "../consumerContext";
import Geocoder from 'react-native-geocoding';


class ConsumerAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      latitude:0,
      longitude:0,
    }

  }
  getData(){
    Geocoder.init("AIzaSyCXUX-a8NteFRhltP-WJ0npzFKiKiG8wb8"); // use a valid API key
    Geocoder.from(this.state.latitude, this.state.longitude)
		.then(json => {
      var addressComponent = json.results[0].address_components;
      if (addressComponent.length==7){
      this.context.action.changestreet(addressComponent[0].long_name + addressComponent[1].long_name);
      this.context.action.changesuburb(addressComponent[2].long_name);
      this.context.action.changestate(addressComponent[4].long_name );
      this.context.action.changepostcode(addressComponent[6].long_name);
      }
      else{

        this.context.action.changestreet(addressComponent[0].long_name);
        this.context.action.changesuburb(addressComponent[1].long_name);
        this.context.action.changestate(addressComponent[3].long_name );
        this.context.action.changepostcode(addressComponent[5].long_name);
      }
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
  render(){
    let state = this.context;
  return (
    <ScrollView style={{ flex:1,backgroundColor:"white"}}>

    <View style={styles.container}>
    <TouchableOpacity onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>预约地址</Text>

    <View style ={styles.comment_container}>
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/address.png')}
      />
    <TouchableOpacity onPress = {()=>{this.getData()}}>
      <Image style = {styles.address_image}
        source= {require('../images/icon/3/localize.png')}
      />
    </TouchableOpacity>
    </View>
    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Street</Text>
      <TextInput style = {styles.street_input} placeholder="街道"
      value = {state.street}
      onChangeText={(text) => {state.action.changestreet(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Suburb</Text>
      <TextInput style = {styles.street_input} placeholder="区"
      value = {state.suburb}
      onChangeText={(text) => {state.action.changesuburb(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>State </Text>
      <TextInput style = {styles.street_input} placeholder="州"
      value = {state.state}
      onChangeText={(text) => {state.action.changestate(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>postcode</Text>
      <TextInput style = {styles.street_input} placeholder="邮编"
      value = {state.postcode}
      onChangeText={(text) => {state.action.changepostcode(text)}}/>
    </View>
    <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom2.png')}
    />
    <TouchableOpacity style={styles.next_wrapper} onPress={() =>{
            this.props.navigation.dispatch(StackActions.pop(1))}}>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>
  )}

}
ConsumerAddress.contextType = DataContext;
export default ConsumerAddress;
