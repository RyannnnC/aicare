import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';

export default function ConsumerAddress({navigation}) {
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }  
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress = {goBack}>
      <Image
        style = {styles.arrow_image}
        source={require('../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>预约地址</Text>
    
    <View style ={styles.comment_container}>
    <Image style = {styles.address_image}
        source= {require('../images/icon/3/address.png')}
      />
      <TouchableOpacity >
      <Image style = {styles.address_image}
        source= {require('../images/icon/3/localize.png')}
      />
    </TouchableOpacity>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Street</Text>
      <TextInput style = {styles.street_input} placeholder="街道"/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Suburb</Text>
      <TextInput style = {styles.street_input} placeholder="区"/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>State </Text>
      <TextInput style = {styles.street_input} placeholder="州"/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>postcode</Text>
      <TextInput style = {styles.street_input} placeholder="邮编"/>
    </View>
    <Image style = {styles.bottom}
        source={require('../images/icon/2/bottom2.png')}
    />
    <TouchableOpacity style={styles.next_wrapper} onPress={goBack}>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('../images/icon/1/contact.png')}
    />
  </View>
  );
}
