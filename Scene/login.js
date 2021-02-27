import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import DataContext from "../providerContext";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info:"",
      password:"",
    }
  }

  loginRequest() {
    let s = this.state;
    let errors=[];
    if (s.info.length === 0) {
        errors.push("Enter a password");
    }
    if (s.password.length === 0) {
        errors.push("Enter a password");
    }
    let url = 'http://3.25.192.210:8080/aicaredb/login/provider?'
    +'user-info='+ s.info
    +'&password=' + s.password;
    fetch(url,{
      method: 'GET',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => {
        if (response.status === 500) {
            Alert.alert("Invalid username or password");
            return false;
        } else {
            console.log("login success");
            this.context.action.changeLogin(true);
        }
    })

  }
  render(){
  return (
    <View style = {styles.container}>
      <Image style = {styles.img3}
        source = {require('../images/welcome.png')}
      />
          <Image style = {styles.img_ac}
        source = {require('../images/account.png')}
      />
      <TextInput
      style = {styles.account}
      placeholder="xxxxx@gmail.com"
      onChangeText={(text) => {this.setState({ info: text})}}
      />
      <Image style = {styles.img_pw}
        source = {require('../images/password.png')}
      />
      <TextInput
      style = {styles.password}
      secureTextEntry={true}
      onChangeText={(text) => {this.setState({ password: text})}}
      />
      <View style ={styles.container2}>
        <TouchableOpacity style={styles.f_wrapper} onPress={() => this.props.navigation.navigate('忘记密码')}>
          <Text style={styles.f_Text}>忘记密码？</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.z_wrapper} onPress={() => this.props.navigation.navigate('注册')}>
          <Text style={styles.r_Text}>注册账户</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginWrapper} onPress = {()=>this.loginRequest()}>
        <Text style={styles.onsite_Text}>登陆</Text>
      </TouchableOpacity>
      <Image style = {styles.img4}
        source = {require('../images/logo.png')}
      />
    </View>
  );}
}

Login.contextType = DataContext;
