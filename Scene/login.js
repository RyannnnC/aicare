import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,AsyncStorage } from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import I18n from "./language"
import * as Localization from 'expo-localization';

import PhoneInput from "react-native-phone-number-input";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      password:"",
      type:"mobile",
      text:"切换邮箱登陆",
      text1:I18n.t('mobile_signin_placeholder')
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
  
  storeToken = async (token,id) => {
    try {
       await AsyncStorage.setItem("token", token);
       await AsyncStorage.setItem("infoId", JSON.stringify(id));
       console.log("Store token success");
       SystemLanguage=Localization.locale.slice(0,2)
  var lan = "en";
  if(SystemLanguage=="en"){
    lan= "en_US"
  }else{
    lan = "zh_CN"
  }
  //Alert.alert(this.state.token);
  let url = 'http://'
      +this.context.url
      +'/aicare-customer-api/changeSessionLanauage?lang='+lan;
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': this.context.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      }, 
    })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        //Alert.alert(json.code)
        if (json.code === 0) {
          //Alert.alert(I18n.t("changed"))
          
          console.log(json.msg)

        } else {
          console.log(json.msg)
          //Alert.alert(this.state.token);
        }
      }).catch(error => console.warn(error));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken() {
    console.log("getting")
    try {

      let userData = await AsyncStorage.getItem("token");
      
  
      
      console.log(userData);
      //let id = await AsyncStorage.getItem("id");
      /*if(id) {
        this.setState({employerId:JSON.parse(id)});
        console.log("Get id success");
      }*/
      if(userData){
        console.log(userData);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  loginRequest() {
    //console.log(this.context.token)
    this.getToken()
    SystemLanguage=Localization.locale.slice(0,2)
  if(SystemLanguage){
    this.context.action.changeLan({language:SystemLanguage})
  }
  var lan = "en";
  if(SystemLanguage=="en"){
    lan= "en_US"
  }else{
    lan = "zh_CN"
  }
  //Alert.alert(this.state.token);
  
    
    let s = this.state;
    let errors=[];
    if (s.name.length === 0) {
        errors.push("Enter an account");
    }
    if (s.password.length === 0) {
        errors.push("Enter a password");
    }
    let url = 'http://'+this.context.url+'/aicare-customer-api/customer/user/login?'
    +'loginName='+ s.name
    +'&passWord=' + s.password
    +"&appType=1" +"&loginType="+s.type;
    fetch(url,{
      method: 'POST',
      headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((json) =>  {
        //console.log(url);
        if (json.code == 0) {
          //this.context.action.changeLogin(true);
          //this.storeToken(json.data);
          this.context.action.changetoken(json.data);
          
          this.context.action.changeInfoId(json.customerUserInfoId);
          this.storeToken(json.data,json.customerUserInfoId);

          //console.log(json.customerUserInfoId);
          
          //console.log(json.code)
        } else {
          Alert.alert(json.msg);  
          console.log(json.msg)
          //this.context.action.changeLogin(true);//need to remove this
        }
    })

  }
  render(){
  return (
    <KeyboardAwareScrollView
    enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    style={{backgroundColor:"white"}}
    contentContainerStyle={{flex:1,backgroundColor: 'white',
    marginTop: -50,
    alignItems: 'center',}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{backgroundColor:"white"}}>
           
      <View style={{marginTop:200}}></View>
      <Image style = {{width:230,height:230,marginLeft:35}}
        source = {require('../images/welcome.png')}
      />
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:20}}>
          <Image style = {{height:20,width:20,marginTop:34}}
        source = {require('../images/telehealth_icon/signup_icon_phone.png')}
      />
      <Text style={{marginTop:35,marginLeft:10}}>{I18n.t('phone_signin')}</Text>
      {/*<TouchableOpacity style={{    borderColor:"#999999",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:40,
    height:35,
    marginLeft:-120,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>this.switch()}>
      <Text style={{fontSize:12}}>{this.state.text}</Text>
    </TouchableOpacity>*/}
      </View>
      <View style={{marginLeft:-15}}>
      <PhoneInput
            //ref={phoneInput}
            //defaultValue={value}
            defaultCode="AU"
            layout="first"
            placeholder={I18n.t("m_pd")}
            onChangeFormattedText={(text) => {
              //console.log("format")
              console.log(text.slice(1));
              this.setState({name:text.slice(1)})
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          </View>
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:10}}>
          <Image style = {{height:20,width:20,marginTop:24}}
        source = {require('../images/telehealth_icon/account_icon_pswd.png')}
      />
      <Text style={{marginTop:25,marginLeft:10}}>{I18n.t('password_signin')}</Text>
      {/*<TouchableOpacity style={{borderColor:"#999999",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:40,
    height:35,
    marginLeft:-120,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>this.switch()}>
      <Text style={{fontSize:12}}>{this.state.text}</Text>
    </TouchableOpacity>*/}
      </View>
      <TextInput
      style = {styles.password}
      placeholder={I18n.t("password_signin_placeholder")}
      defaultValue=""
      secureTextEntry={true}
      onChangeText={(text) => {this.setState({ password: text})}}
      />
      <View style ={styles.container2}>
        <View style={{marginLeft:0}}>
        <TouchableOpacity style={styles.f_wrapper} onPress={() => this.props.navigation.navigate(I18n.t("forget_password_signin"))}>
          <Text style={styles.f_Text}>{I18n.t('forget_password_signin')}</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop:20,marginLeft:130}} onPress={() => this.props.navigation.navigate(I18n.t("signup_signin"))}>
          <Text style={styles.r_Text}>{I18n.t('signup_signin')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:0}}></View>
      <TouchableOpacity style={{backgroundColor: '#8FD7D3',
              padding:10,
              width:280,
              marginTop:60,
              height:45,
              alignItems: 'center',
              borderRadius:25,}}
              onPress = {()=>this.loginRequest()}>
        <Text style={{color:"white"}}>{I18n.t('signin')}</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
      <Image style = {{marginTop:70,
    width:120,
    height:32,marginLeft:63}}
        source = {require('../images/logo.png')}
      />
      <Text style={{marginTop:75,marginLeft:10,color:"#8FD7D3"}}>{this.context.version}</Text>
      </View>
      
    </View>
    <View style={{height:100,backgroundColor:'white'}}></View> 
    </KeyboardAwareScrollView>
  );}
}

Login.contextType = DataContext;