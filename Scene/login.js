import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'
import {styles} from '../style';

export default function Login() {
  const goToConsumer = () => {
    Actions.consumer()
  }
  return (
    <View style = {styles.container}>
      <Image style = {styles.img3}
        source = {require('../images/welcome.png')}
      />
          <Image style = {styles.img_ac}
        source = {require('../images/account.png')}
      />
      <TextInput style = {styles.account}/>
      <Image style = {styles.img_pw}
        source = {require('../images/password.png')}
      />
      <TextInput style = {styles.password}/>
      <View style ={styles.container2}>
        <TouchableOpacity style={styles.f_wrapper}>
          <Text style={styles.f_Text}>忘记密码？</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.f_wrapper}>
          <Text style={styles.r_Text}>注册账户</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.login_wrapper} onPress = {goToConsumer}>
        <Text style={styles.onsite_Text}>登陆</Text>
      </TouchableOpacity>
      <Image style = {styles.img4}
        source = {require('../images/logo.png')}
      />
    </View>
  );
}
