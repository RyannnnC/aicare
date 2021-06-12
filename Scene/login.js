import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, View, Alert, Image,TouchableOpacity,TextInput } from 'react-native';
import {styles} from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    let ct = 0;
    if (Platform.isPad) {
      ct = 4
    } else if (Platform.OS ==='android') {
      ct = 1
    } else if (Platform.OS ==='ios') {
      ct = 2
    } else {
      ct = 3
    }
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
    +'&clientType=' + ct
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
          if (json.roleType == '2') {
            this.storeId(json.employerId);
            this.context.action.changeemployerid(json.employerId);
          }
          this.storeToken(json.data,json.refresh_token);
          this.context.action.changetoken(json.data,json.refresh_token);
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
      +'&clientType=' + ct
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
            if (json.roleType == '2') {
              this.storeId(json.employerId);
              this.context.action.changeemployerid(json.employerId);
            }
            this.storeToken(json.data,json.refresh_token);
            this.context.action.changetoken(json.data,json.refresh_token);
          } else {
            Alert.alert("Invalid username or password");
            return false;
          }
      })
    }
  }

  storeToken = async (token,rtoken) => {
    try {
       await AsyncStorage.setItem("token", token);
       await AsyncStorage.setItem("rtoken", rtoken);
       console.log("Store token success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  storeId = async (token) => {
   try {
      await AsyncStorage.setItem("id", JSON.stringify(token));
      console.log("Store id success");
   } catch (error) {
     console.log("Something went wrong", error);
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
        <View style={{width:'80%',marginTop:50}}>
          <View style={{marginBottom:10,flexDirection:'row'}}>
            <View style={{width:'50%',alignItems:'flex-start',flexDirection:'row'}}>
            <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('account')}</Text>
            </View>
            <View style={{width:'50%',alignItems:'flex-end'}}>
            <TouchableOpacity onPress={() => {this.setState({email:true,mobile:false})}}>
              <Text style={{color:'blue'}}>{I18n.t('loginEmail')}</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View  style={{width: '100%',flexDirection:'row'}}>
          <Image
            style = {{width:30,height:30,marginRight:10}}
            source = {require('../images/providerImg/account_icon_phone_1.png')}
          />
          <TextInput
            style = {{height: 35,width: '90%',borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}
            placeholder="04********"
            onChangeText={(text) => {this.setState({ info: text})}}
          />
          </View>
        </View>)}
        {this.state.email && (
          <View style={{width:'80%',marginTop:50}}>
            <View style={{marginBottom:10,flexDirection:'row'}}>
              <View style={{width:'50%',alignItems:'flex-start',flexDirection:'row'}}>
              <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('account')}</Text>
              </View>
              <View style={{width:'50%',alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => {this.setState({email:false,mobile:true})}}>
                  <Text style={{color:'blue'}}>{I18n.t('loginMobile')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View  style={{width: '100%',flexDirection:'row'}}>
            <Image
              style = {{width:30,height:30,marginRight:10}}
              source = {require('../images/providerImg/account_icon_mail_1.png')}
            />
            <TextInput
              style = {{height: 35,width: '90%',borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}
              placeholder="xxxxx@gmail.com"
              onChangeText={(text) => {this.setState({ info: text})}}
            />
            </View>
          </View>)}
      <View style={{width:'80%',marginTop:25}}>
        <View style={{marginBottom:10,flexDirection:'row'}}>
          <Text style={{ fontSize:18, fontWeight: '500', color: '#333333' }}>{I18n.t('password')}</Text>
        </View>
        <View  style={{width: '100%',flexDirection:'row'}}>
        <Image
          style = {{width:30,height:30,marginRight:10}}
          source = {require('../images/providerImg/login_icon_pswd.png')}
        />
        <TextInput
        style = {{height: 35,width: '90%',borderBottomWidth:1,borderBottomColor:'#BBBBBB'}}
        secureTextEntry={true}
        onChangeText={(text) => {this.setState({ password: text})}}
        />
        </View>
      </View>

      <View style ={{marginTop:20,flexDirection: 'row',width:'80%'}}>
        <View style={{width:'50%',alignItems:'flex-start'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(I18n.t('forgotPassword'))}>
          <Text style={styles.f_Text}>{I18n.t('forgotPassword')}</Text>
        </TouchableOpacity>
        </View>
        <View style={{width:'50%',alignItems:'flex-end'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(I18n.t('signup'))}>
          <Text style={styles.r_Text}>{I18n.t('signup')}</Text>
        </TouchableOpacity>
        </View>
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
