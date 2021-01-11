import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';

export default function Info({navigation}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const gotoDate= () => {
    navigation.navigate("consumerDate")
  }
  const gotoPayInfo= () => {
    navigation.navigate("consumerPayInfo")
  }
  const gotoAddress= () => {
    navigation.navigate("consumerAddress")
  }
  return (
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
    <TextInput style = {styles.account} placeholder="姓名：张三"/>

    <Image style = {styles.name_image}
        source= {require('../images/icon/3/mobile.png')}
      />
    <TextInput style = {styles.account} placeholder="澳大利亚电话号码，以0开头。"/>
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/booking.png')}
      />
    <View style ={styles.comment_container}>
      <TextInput style = {styles.account} placeholder="请点击右边箭头按钮输入预约时间信息。"/>
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
      <TextInput style = {styles.account} placeholder="请点击右边箭头按钮输入预约地址信息。"/>
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

    <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom2.png')}
    />
    <TouchableOpacity style={styles.next_wrapper} onPress ={gotoPayInfo}>
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  );
}
