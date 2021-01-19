import React, { Component } from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import DataContext from "../consumerContext";
//import RNLocation from 'react-native-location';


class ConsumerAddress extends Component{
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  goBack(){
    this.props.navigation.dispatch(StackActions.pop(1));
  }  
  
  
  render(){
    let state = this.context;
    const { navigation } = this.props;

  return (
    
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
      <TouchableOpacity >
      <Image style = {styles.address_image}
        source= {require('../images/icon/3/localize.png')}
      />
    </TouchableOpacity> 
    </View>
    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Street</Text>
      <TextInput style = {styles.street_input} placeholder="街道"
      onChangeText={(text) => {state.action.changestreet(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Suburb</Text>
      <TextInput style = {styles.street_input} placeholder="区"
      onChangeText={(text) => {state.action.changesuburb(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>State </Text>
      <TextInput style = {styles.street_input} placeholder="州"
      onChangeText={(text) => {state.action.changestate(text)}}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>postcode</Text>
      <TextInput style = {styles.street_input} placeholder="邮编"
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
  )}

}
ConsumerAddress.contextType = DataContext;
export default ConsumerAddress;