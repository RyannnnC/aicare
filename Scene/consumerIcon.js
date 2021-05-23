import React,{useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch} from 'react-native';
import {styles} from '../style';
import call from 'react-native-phone-call'
import { ScrollView } from 'react-native-gesture-handler';
import DataContext from "../consumerContext";


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
  const user = useContext(DataContext)

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
    <View style={{marginTop:20}}></View>
    <TouchableOpacity onPress = {goToTelehealth}>
      <Image
        style = {{marginTop:40,
          height:120,
          width:290,
          marginLeft:30,
          }}
        source = {require('../images/new_icon.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:20}}></View>
    {/*<TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {require('../images/telehealth_icon/service_block2.png')}
      />
    </TouchableOpacity>*/}

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
    
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{marginLeft:-50,marginTop:20,width:60,height:60,borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginTop:110}}></View>
    

    
  </View>
  </ScrollView>

  );
}
export default ConsumerIcon;