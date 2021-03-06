import React ,{Component}from 'react';
import { Alert,Text, Button, View, Switch, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from './providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class Forget extends Component {
  state = {
    mail:"",
    password:"",
    confirm: "",
    code:"",
  }
  sendRequest() {
    let s = this.state;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/updatepassword?'
    +'email='+ s.mail
    +'&code=' + s.code
    +'&type=email'
    +'&appType=1'
    +'&clientType=3'
    +'&password=' + s.password;
    console.log(url);
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        if (json.code === 0) {
          console.log("success");
          Alert.alert("修改成功");
          this.props.navigation.navigate('登陆');
        } else {
          Alert.alert("Unknown Error");
          return false;
        }
    })
  }
  sendCode() {
    let m = this.state.mail;
    let url = 'http://3.104.232.106:8084/aicare-business-api/business/user/send?'
    +'email=' + m
    +'&type=email';
    console.log(url);
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({ type: 'email'});
      console.log(json.msg);
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
          <ScrollView>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_mail.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>邮箱</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的邮箱"
          onChangeText={(text) => {this.setState({ mail: text})}}
          />
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/signup_icon_key.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>验证码</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
            <TextInput style={styles.resumeInput}
            placeholder= "请输入您收到的验证码"
            onChangeText={(text) => {this.setState({ code: text})}}
            />
            </View>
            <TouchableOpacity style={styles.codeTab}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:14, fontWeight: '300' }}>获取验证码</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/login_icon_pswd.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请输入您的密码"
          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/providerImg/account_icon_confirm.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>确认新密码</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB'}}>
          <TextInput style={styles.resumeInput}
          placeholder="请再次输入您的密码"
          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>
          <TouchableOpacity style={styles.resumeButton} onPress={()=>this.sendRequest()}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
          </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
  );}
}
