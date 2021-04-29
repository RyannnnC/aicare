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
    Alert.alert('功能将在下一版本更新，敬请期待')
  }

  return (
    <ScrollView style={{ flex:1,backgroundColor:"white"}}>

    <View style={{ backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center'}}>
    <View style={{height:10}}></View>
    <Image
      style = {styles.topping_image}
      source={require('../images/order_img.png')}
    />
    <View style={{marginTop:20}}></View>
    <Text style={{color:'#006A71',
    fontSize:17,
    marginTop:20,
    marginLeft:25,}}>服务类型</Text>
    <TouchableOpacity onPress = {goToTelehealth}>
      <Image
        style = {{marginTop:40,
          height:120,
          width:290,
          marginLeft:30,
          }}
        source = {require('../images/telehealth_icon/service_block1.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {require('../images/telehealth_icon/service_block2.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress = {()=>    navigation.navigate("telehealthSub",{docType:7})
}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {require('../images/telehealth_icon/service_block3.png')}
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