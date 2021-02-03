import React,{useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import DataContext from '../consumerContext';
import { State } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import call from 'react-native-phone-call'

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function Info({navigation}) {
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
    navigation.navigate("cp")
  }
  const gotoAddress= () => {
    navigation.navigate("consumerAddress")
  }
  const typename = (value) => {
    text => setText(text);
    state.action.changename(text);
  }
  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={styles.container}>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>个人信息</Text>
    <Image style = {styles.name_image}
        source= {require('../images/icon/3/name.png')}
      />
    <TextInput style = {styles.account} placeholder="姓名：张三"
    onChangeText={(text) => {text => setText(text);state.action.changename(text)}}
    />
    
    <Image style = {styles.name_image}
        source= {require('../images/icon/3/mobile.png')}
      />
    <TextInput style = {styles.account} placeholder="澳大利亚电话号码，以0开头。"
    onChangeText={text1 => setText1(text1)}
    />
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/booking.png')}
      />
    <View style ={styles.comment_container}>
      <Text>{state.date + " "+state.start_time}</Text>
      <TouchableOpacity onPress={gotoDate}>
      <Image style = {styles.comment_image}
        source= {require('../images/icon/2/Arrow_right.png')}
      />
    </TouchableOpacity>
    </View>
    
    
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/address.png')}
      />
    <View style ={styles.comment_container}>
      <Text>{state.street + " " + state.suburb + " " + state.state + state.postcode.toString()}</Text>
      <TouchableOpacity onPress={gotoAddress}>
      <Image style = {styles.comment_image}
        source= {require('../images/icon/2/Arrow_right.png')}
      />
    </TouchableOpacity>
    </View>

    <Image style = {styles.address_image}
        source= {require('../images/icon/3/comment.png')}
      />
    <TextInput style = {styles.account} placeholder="如有备注可以在此处留言。"/>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,position:"absolute",borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom2.png')}
    />
    
    <TouchableOpacity style={styles.next_wrapper} onPress ={gotoCP}>
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  )}
  </DataContext.Consumer>
  );
}
