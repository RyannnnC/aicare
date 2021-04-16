import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      password:"",
      type:"mobile",
      text:"切换邮箱登陆",
      text1:"请输入您的注册手机号码"
    }
  }
  switch(){
    let s = this.state;
    if(s.type=="mobile"){
      this.setState({text:"切换手机登陆"});
      this.setState({type:"email"})
      this.setState({text1:"请输入您的注册邮箱号码"})

    }else{
      this.setState({text:"切换邮箱登陆"});
      this.setState({type:"mobile"})
      this.setState({text1:"请输入您的注册手机号码"})
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
    let url = 'http://3.104.232.106:8085/aicare-customer-api/customer/user/login?'
    +'loginName='+ s.name
    +'&passWord=' + s.password
    +"&appType=4" +"&loginType="+s.type;
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        console.log(json);
        if (json.code === 0) {
          //this.context.action.changeLogin(true);
          this.context.action.changetoken(json.data);
        } else {
          Alert.alert("Invalid username or password");  
          //this.context.action.changeLogin(true);//need to remove this
        }
    })

  }
  render(){
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      <View style={{marginTop:150}}></View>
      <Image style = {{width:150,height:150}}
        source = {require('../images/welcome.png')}
      />
      <View style={{flexDirection:"row"}}>
          <Image style = {styles.img_ac}
        source = {require('../images/account.png')}
      />
      <TouchableOpacity style={{    borderColor:"#999999",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:40,
    height:35,
    marginLeft:-120,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>this.switch()}>
      <Text style={{fontSize:12}}>{this.state.text}</Text>
    </TouchableOpacity>
      </View>
      <TextInput
      style = {styles.account}
      placeholder={this.state.text1}
      defaultValue=""
      onChangeText={(text) => {this.setState({ name: text})}}
      />
      <Image style = {styles.img_pw}
        source = {require('../images/password.png')}
      />
      <TextInput
      style = {styles.password}
      placeholder="请输入您的密码"
      defaultValue=""
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
      <View style={{flexDirection:"row"}}>
      <Image style = {styles.img4}
        source = {require('../images/logo.png')}
      />
      <Text style={{marginTop:95,marginLeft:10,color:"#8FD7D3"}}>1.2</Text>
      </View>
      <View style={{height:90,backgroundColor:'white',padding:30}}></View>
      
    </KeyboardAvoidingView>
  );}
}

Login.contextType = DataContext;