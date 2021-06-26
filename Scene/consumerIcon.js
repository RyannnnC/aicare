import React,{useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,AsyncStorage} from 'react-native';
import {styles} from '../style';
import call from 'react-native-phone-call'
import { ScrollView } from 'react-native-gesture-handler';
import DataContext from "../consumerContext";


const  ConsumerIcon= ({navigation}) => {
  const goToOrder= () => {
    navigation.navigate('consumerOrder')
  }
  const goToTelehealth= () => {
    if(checkToken()){
      Alert.alert(
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
          onPress:()=>removeToken()//navigation.navigate("登陆")

        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthMain")
}
const checkToken=()=>{
  if (user.token==-1){
    return true
  }else{
    return false
  }
}
const removeToken=async() =>{
  try {
    await AsyncStorage.removeItem("token");
    //await AsyncStorage.removeItem("firsttime");

    console.log("Remove token success");
    user.action.clearstate()
  } catch (error) {
    console.log("Something went wrong", error);

  }
}
  const goSomewhere=(index)=>{
    if(checkToken()){
      Alert.alert(
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
          onPress:()=>removeToken()//navigation.navigate("登陆")

        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthClinic",{return:"",type:true,doctype:index,state:"NSW"})
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
    <View style={{height:80}}></View>
    <Image
      style = {styles.topping_image}
      source={require('../images/telehealth_icon/service_img.png')}
    />
    <View style={{marginTop:20}}></View>
    <Text style={{color:'#006A71',
    fontSize:17,
    marginTop:20,
    marginLeft:25,}}>所有服务</Text>
    <View style={{marginTop:20}}></View>
    <TouchableOpacity onPress = {goToTelehealth}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,
          }}
        source = {require('../images/large_d_booking.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:0}}></View>
    {/*<TouchableOpacity onPress = {alertHandler}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {require('../images/telehealth_icon/service_block2.png')}
      />
    </TouchableOpacity>*/}

    <TouchableOpacity onPress = {()=>Alert.alert(
      "疫苗阶段提醒",
      "根据澳大利亚政府信息，目前(2021.6.8之后)澳大利亚疫苗阶段处于2a阶段，只有符合2a条件(40岁以上或关键高风险工作者)可以注射疫苗，诊所提供的疫苗类型为阿斯利康，请在预约之前自行核实自己是否符合标准。具体信息可在health.gov.au查看。点击确认继续疫苗预约。",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress :()=>   goSomewhere(7) } //this should navigate to the login page
      ],
      { cancelable: false }
      )}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {require('../images/large_c_booking.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:0}}></View>
    <TouchableOpacity onPress={()=>goSomewhere(9)} >
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,
          }}
        source = {require('../images/bodycheck_long.png')}
      />
    </TouchableOpacity>
    
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{marginLeft:-75,marginTop:20,width:60,height:60,borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginTop:110}}></View>
    

    
  </View>
  </ScrollView>

  );
}
export default ConsumerIcon;