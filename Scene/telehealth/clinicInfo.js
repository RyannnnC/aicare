import React,{ useState,setState }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView,Modal} from 'react-native';
import { Icon } from 'react-native-elements'
import ConsumerDate from "../consumerDate"
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
//import call from 'react-native-phone-call'
//import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function ClinicInfo({navigation}) {
  const gotoDoc= () => {
    navigation.navigate('telehealthDoc')
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <View style={styles.container}>
    <ScrollView>
    <View style={{flexDirection:'row',marginTop:20,marginLeft:-10}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:30}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {styles.service}>诊所信息</Text>
    
    </View>

     <Image style = {{width:400,height:1000}}
      source = {require('../../images/clinic_image.png')}
    />
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:10}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>

    <TouchableOpacity style={styles.next_wrapper} onPress={gotoDoc}>
      <Text style={styles.onsite_text}>预约</Text>
    </TouchableOpacity>
    </ScrollView>
   
  </View>
)}

