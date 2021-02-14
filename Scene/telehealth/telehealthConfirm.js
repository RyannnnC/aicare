import React,{useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
//import DataContext from '../consumerContext';
import { State } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function Confirm({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const [text, setText] = useState('')
  const [text1, setText1] = useState('')
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const goBack= () => {
    navigation.navigate("consumerOrder")
  }
  const gotoDate= () => {
    navigation.navigate("consumerDate")
  }
  const gotoCP= () => {
    navigation.navigate("teleSuccess")
  }
  const gotoAddress= () => {
    navigation.navigate("consumerAddress")
  }
  const typename = (value) => {
    text => setText(text);
    state.action.changename(text);
  }
  return (
   
    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:20,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {styles.service}>个人信息</Text>
    </View>
    <Image style = {styles.name_image}
        source= {require('../../images/icon/3/name.png')}
      />
    <TextInput style = {styles.account} placeholder="姓名：张三"
    onChangeText={(text) => {text => setText(text)}}
    />
    
    <Image style = {styles.name_image}
        source= {require('../../images/icon/3/mobile.png')}
      />
    <TextInput style = {styles.account} placeholder="0483276876"
    onChangeText={text1 => setText1(text1)}
    />
     <Image style = {{width:120,height:30,marginTop:20}}
        source= {require('../../images/time.png')}
      />
    <TextInput style = {styles.account} placeholder="比如：12/25 16:00-16:30"
    onChangeText={text1 => setText1(text1)}
    />

    
    
  
    <Image style = {styles.address_image}
        source= {require('../../images/way.png')}
      />
    <TextInput style = {styles.account} placeholder="实地预约/线上预约"/>
    <View style ={styles.switch_container}>
      <Switch style={styles.tick1}
          onValueChange={() => {setIsEnabled(previousState => !previousState);
          }}
          value={isEnabled}
        />
      <Text style={styles.switch_text}>默认填写个人信息</Text>
    </View>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:-170}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>

    
    <TouchableOpacity style={styles.next_wrapper} onPress ={gotoCP}>
      <Text style={styles.onsite_text}>完成</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../../images/icon/1/contact.png')}
    />
  </View>
  )}

