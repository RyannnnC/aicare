import React,{Component} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      password:"",
    }
  }

  loginRequest() {
    let s = this.state;
    let errors=[];
    if (s.name.length === 0) {
        errors.push("Enter an account");
    }
    if (s.password.length === 0) {
        errors.push("Enter a password");
    }
    let url = 'http://3.104.232.106:8080/aicaredb/login/consumer?'
    +'user-info='+ s.name
    +'&password=' + s.password;
    fetch(url,{
      method: 'POST',
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
      <View style={{marginTop:150}}></View>
      <Image style = {{width:150,height:150}}
        source = {require('../images/welcome.png')}
      />
          <Image style = {styles.img_ac}
        source = {require('../images/account.png')}
      />
      <TextInput
      style = {styles.account}
      placeholder="请输入您的邮箱或手机号码"
      onChangeText={(text) => {this.setState({ name: text})}}
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
        <View style={{marginLeft:-10}}>
        <TouchableOpacity style={styles.f_wrapper} onPress={() => this.props.navigation.navigate('忘记密码')}>
          <Text style={styles.f_Text}>忘记密码？</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop:20,marginLeft:80}} onPress={() => this.props.navigation.navigate('注册')}>
          <Text style={styles.r_Text}>注册账户</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20}}></View>
      <TouchableOpacity style={styles.loginWrapper} onPress = {()=>this.loginRequest()}>
        <Text style={styles.onsite_Text}>登陆</Text>
      </TouchableOpacity>
      <Image style = {styles.img4}
        source = {require('../images/logo.png')}
      />
      <View style={{height:90,backgroundColor:'white'}}></View>
    </View>
  );}
}

Login.contextType = DataContext;