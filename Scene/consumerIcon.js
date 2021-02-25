import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch} from 'react-native';
import {styles} from '../style';
import call from 'react-native-phone-call'
import { ScrollView } from 'react-native-gesture-handler';


const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

const  ConsumerIcon= ({navigation}) => {
  const goToOrder= () => {
    navigation.navigate('consumerOrder')
  }
  const goToTelehealth= () => {
    navigation.navigate("telehealthMain")
}
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const alertHandler= () => {
    Alert.alert('此功能还未完善')
  }

  return (
    <ScrollView style={{ flex:1,backgroundColor:"white"}}>

    <View style={{ backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center'}}>

    <Image
      style = {styles.topping_image}
      source={require('../images/order_img.png')}
    />
    <View style={{marginTop:20}}></View>
    <Text style={styles.service}>服务类型</Text>
    <TouchableOpacity onPress = {goToTelehealth}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/booking_image.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {goToOrder}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/store_image.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {styles.button_image}
        source = {require('../images/icon/1/delivery_image.png')}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginTop:110}}></View>
    

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>

  );
}
export default ConsumerIcon;