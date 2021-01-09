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

    <Text style = {styles.service}>个人信息</Text>
    <Image style = {styles.name_image}
        source= {require('./images/icon/3/name.png')}
      />
    <TextInput style = {styles.account}/>

    <Image style = {styles.name_image}
        source= {require('./images/icon/3/mobile.png')}
      />
    <TextInput style = {styles.account}/>
    <Image style = {styles.address_image}
        source= {require('./images/icon/3/booking.png')}
      />
    <View style ={styles.comment_container}>
      <TextInput style = {styles.account}/>
      <TouchableOpacity >
      <Image style = {styles.comment_image}
        source= {require('./images/icon/2/Arrow_right.png')}
      />
    </TouchableOpacity>
    </View>
    
    
    <Image style = {styles.address_image}
        source= {require('./images/icon/3/address.png')}
      />
    <View style ={styles.comment_container}>
      <TextInput style = {styles.account}/>
      <TouchableOpacity >
      <Image style = {styles.comment_image}
        source= {require('./images/icon/2/Arrow_right.png')}
      />
    </TouchableOpacity>
    </View>

    <Image style = {styles.address_image}
        source= {require('./images/icon/3/comment.png')}
      />
    <TextInput style = {styles.account}/>

    <Image style = {styles.bottom}
        source={require('./images/icon/2/bottom2.png')}
    />
    <TouchableOpacity style={styles.next_wrapper}>
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>

    <Image style = {styles.contact}
      source = {require('./images/icon/1/contact.png')}
    />
  </View>
  );
}
