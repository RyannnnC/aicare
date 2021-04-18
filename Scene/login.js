import React,{Component} from 'react';
import { SafeAreaView,Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../style';
import DataContext from "../providerContext";
import I18n from './switchLanguage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info:"",
      password:"",
      email:false,
      mobile:true,
    }
  }

  loginRequest() {
    let s = this.state;
    if (s.info.length === 0) {
        Alert.alert("Enter a valid phone or email");
        return false;
    } else if (s.password.length === 0) {
        Alert.alert("Enter a password");
        return false;
    }
    if (this.state.mobile) {
    let url = 'http://'
    +this.context.url
    +'/aicare-business-api/business/user/login?'
    +'loginName='+ s.info
    +'&passWord=' + s.password
    +'&appType=1'
    +'&loginType=mobile'
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
          this.context.action.changeLogin(true);
          this.context.action.changetoken(json.data);
          if (json.roleType == '2') {
            this.context.action.changeemployerid(json.employerId);
            console.log(this.context.emplyerId)
          }
          console.log(Platform)
        } else {
          Alert.alert("Invalid username or password");
          return false;
        }
    })} else {
      let url = 'http://'
      +this.context.url
      +'/aicare-business-api/business/user/login?'
      +'loginName='+ s.info
      +'&passWord=' + s.password
      +'&appType=1'
      +'&loginType=email'
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
            console.log("login success");
            this.context.action.changeLogin(true);
            this.context.action.changetoken(json.data);
            if (json.roleType == '2') {
              this.context.action.changeemployerid(json.employerId);
              console.log(this.context.emplyerId)
            }
            console.log(Platform)
          } else {
            Alert.alert("Invalid username or password");
            return false;
          }
      })
    }
  }

  render(){
  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
      <Image style = {styles.img3}
        source = {require('../images/providerImg/login_img_1.png')}
      />
      {this.state.mobile && (
        <View style={{marginTop:50,borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}>
          <View style={{marginBottom:10,flexDirection:'row'}}>
            <Image
              style = {{width:20,height:20,marginRight:10}}
              source = {require('../images/providerImg/login_icon_account.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('account')}</Text>
            <TouchableOpacity style={{marginLeft:150}} onPress={() => {this.setState({email:true,mobile:false})}}>
              <Text style={{color:'blue'}}>邮箱登陆</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style = {styles.account}
            placeholder="04********"
            onChangeText={(text) => {this.setState({ info: text})}}
          />
        </View>)}
        {this.state.email && (
          <View style={{marginTop:50,borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}>
            <View style={{marginBottom:10,flexDirection:'row'}}>
              <Image
                style = {{width:20,height:20,marginRight:10}}
                source = {require('../images/providerImg/login_icon_account.png')}
              />
              <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('account')}</Text>
              <TouchableOpacity style={{marginLeft:150}} onPress={() => {this.setState({email:false,mobile:true})}}>
                <Text style={{color:'blue'}}>手机登陆</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style = {styles.account}
              placeholder="xxxxx@gmail.com"
              onChangeText={(text) => {this.setState({ info: text})}}
            />
          </View>)}
      <View style={{marginTop:25,borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}>
        <View style={{marginBottom:10,flexDirection:'row'}}>
          <Image
            style = {{width:20,height:20,marginRight:10}}
            source = {require('../images/providerImg/login_icon_pswd.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('password')}</Text>
        </View>
        <TextInput
        style = {styles.password}
        secureTextEntry={true}
        onChangeText={(text) => {this.setState({ password: text})}}
        />
      </View>

      <View style ={styles.container2}>
        <TouchableOpacity style={styles.f_wrapper} onPress={() => this.props.navigation.navigate('忘记密码')}>
          <Text style={styles.f_Text}>{I18n.t('forgotPassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.z_wrapper} onPress={() => this.props.navigation.navigate('注册')}>
          <Text style={styles.r_Text}>{I18n.t('signup')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginWrapper} onPress = {()=>this.loginRequest()}>
        <Text style={styles.onsite_Text}>{I18n.t('login')}</Text>
      </TouchableOpacity>
      <Image style = {styles.img4}
        source = {require('../images/logo.png')}
      />
    </View>
    </KeyboardAvoidingView>
  );}
}

Login.contextType = DataContext;
