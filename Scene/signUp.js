import React ,{Component}from 'react';
import { Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Signup extends Component {
  state = {
    name:"",
    phone:"",
    mail:"",
    password:"",
    confirm: "",
    userCode:"",
    mailCode:"",
  }
  sendRequest() {
    let errors = [];
    let s = this.state;

    if (s.name.length === 0) {
        errors.push("Enter a username");
    } else if (s.name.length < 3) {
        errors.push("Username must be 3 characters or longer");
    }
    if (/[^A-Za-z0-9\-_.]/.test(username)) {
        errors.push("Username must only contain alphanumeric characters and - _ .");
    }

    if (email.length === 0) {
        errors.push("Enter an email");
    } else if (!validEmail(email)) {
        errors.push("Email is invalid");
    }

    if (password !== repeatpassword) {
        errors.push("Passwords do not match");
    }
    if (password.length === 0) {
        errors.push("Enter a password");
    } else if (password.length < 8) {
        errors.push("Password must be 8 characters or longer");
    }

    if (password.length !== 0 && !(/[A-Z]/.test(password) && /[0-9]/.test(password))) {
        errors.push("Password must have at least one uppercase letter, and at least one digit");
    }


    let url = 'http://13.239.57.130:8080/aicare-register/register/provider?'
    +'name='+ s.name
    +'&phone=' + s.phone
    +'&email=' + s.mail
    +'&password=' + s.password;
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => console.log(response.status))
  //  .then(json => {console.log(json)});
  }
  sendCode() {
    let m = this.state.mail;
    let url = 'http://13.239.57.130:8080/aicare-smtp/smtp?'
    +'&mail-address=' + m
    console.log(url);
    fetch(url,{
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({ mailCode: json.code});
      console.log(json.code);
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
          <View style={{alignItems: "Left" }}>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>姓名</Text>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的名字"
          onChangeText={(text) => {this.setState({ name: text})}}
          />

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>电话</Text>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的联系方式"
          onChangeText={(text) => {this.setState({ phone: text})}}
          />

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_mail.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>邮箱</Text>
            <TouchableOpacity style={{width:'auto', marginTop: 3, marginLeft: 25, paddingLeft:10, paddingRight:10, height:20,borderRadius:10,borderWidth:1}}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:14, fontWeight: '300' }}>发送验证码</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的邮箱"
          onChangeText={(text) => {this.setState({ mail: text})}}
          />

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_key.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>验证码</Text>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder= "请输入您邮箱内收到的验证码"
          onChangeText={(text) => {this.setState({ userCode: text})}}
          />

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/login_icon_pswd.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>密码</Text>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的密码"
          onChangeText={(text) => {this.setState({ password: text})}}
          />

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/account_icon_confirm.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>确认</Text>
          </View>
          <TextInput style={styles.resumeInput}
          placeholder="请再次输入您的密码"
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />

          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
      </SafeAreaView>
  );}
}
