import React,{ useState,setState }from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,ScrollView } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import DataContext from '../consumerContext';
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function ProviderInfo({navigation}) {
  
  const gotoInfo= () => {
    navigation.navigate('consumerPayInfo')
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={styles.container}>
    <ScrollView>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <Image style = {{width:400,height:300}}
      source = {require('../images/missli.png')}
    />
     <Image style = {{width:400,height:600}}
      source = {require('../images/missli2.png')}
    />
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:10}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <TouchableOpacity style={styles.next_wrapper} onPress ={gotoInfo}>
      <Text style={styles.onsite_text}>预约</Text>
    </TouchableOpacity>
    </ScrollView>
   
  </View>
  )}
  </DataContext.Consumer>

  );
}
