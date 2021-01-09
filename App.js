import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from './style';

export default function Consumer() {
  return (
    <View style={styles.container}>

    <Image style = {styles.finish_image}
        source= {require('./images/icon/3/finishPayment.png')}
      />
    {/*this should generate automatically instead of hand coded */}
    <View style ={styles.comment_container}>
      <Text>支付方式:       </Text>
      <Text>Mastercard</Text>      
    </View>
    <View style ={styles.comment_container}>
      <Text>订单号:       </Text>
      <Text>123123123</Text>      
    </View>
    <View style ={styles.comment_container}>
      <Text>下单时间:       </Text>
      <Text>2020.10.02 14:20</Text>      
    </View>
    <Image style = {styles.bottom}
        source={require('./images/icon/3/bottom4.png')}
    />
    <TouchableOpacity style={styles.next_wrapper}>
      <Text style={styles.onsite_text}>确认</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('./images/icon/1/contact.png')}
    />
  </View>
  );
}
