import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from './style';

export default function Consumer() {
  return (
    <View style={styles.container}>
    <TouchableOpacity >
      <Image
        style = {styles.arrow_image}
        source={require('./images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>

    <Text style = {styles.service}>预约地址</Text>
    
    <View style ={styles.comment_container}>
    <Image style = {styles.address_image}
        source= {require('./images/icon/3/address.png')}
      />
      <TouchableOpacity >
      <Image style = {styles.address_image}
        source= {require('./images/icon/3/localize.png')}
      />
    </TouchableOpacity>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Street</Text>
      <TextInput style = {styles.street_input}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>Suburb</Text>
      <TextInput style = {styles.street_input}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>State </Text>
      <TextInput style = {styles.street_input}/>
    </View>

    <View style ={styles.comment_container}>
      <Text style = {styles.street}>postcode</Text>
      <TextInput style = {styles.street_input}/>
    </View>
    <Image style = {styles.bottom}
        source={require('./images/icon/2/bottom2.png')}
    />
    <TouchableOpacity style={styles.next_wrapper}>
      <Text style={styles.onsite_text}>确定</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('./images/icon/1/contact.png')}
    />
  </View>
  );
}
