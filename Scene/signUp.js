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
  }
  sendRequest() {
    let n = this.state.name;
    let p = this.state.phone;
    let m = this.state.mail;
    let d = this.state.password;
    let url = 'http://13.239.57.130:8080/aicare-register/register/provider?'
    +'name='+ n
    +'&phone=' + p
    +'&email=' + m
    +'&password=' + d;
    console.log(url);
    fetch(url,{mode:'no-cors'});
  }
  sendCode() {
    let m = this.state.mail;
    let url = 'http://13.239.57.130:8080/aicare-service/smtp?'
    +'&mail-address=' + m
    console.log(url);
    fetch(url,{mode:'no-cors'})
    .then((response) => console.log(response))
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
          <TextInput style={styles.resumeInput} placeholder= "请输入您邮箱内收到的验证码"/>

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
