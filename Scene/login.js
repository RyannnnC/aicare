import React,{Component} from 'react';
import { Platform,KeyboardAvoidingView,Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,AsyncStorage } from 'react-native';
import {styles} from '../style';
import DataContext from "../consumerContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  
  storeToken = async (token) => {
    try {
       await AsyncStorage.setItem("token", token);
       console.log("Store token success");
    } catch (error) {
      console.log("Something went wrong", error);
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
    let url = 'http://'+this.context.url+'/aicare-customer-api/customer/user/login?'
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
        //console.log(url);
        if (json.code == 0) {
          //this.context.action.changeLogin(true);
          //this.storeToken(json.data);
          this.context.action.changetoken(json.data);
          this.context.action.changeInfoId(json.customerUserInfoId);
          console.log(this.context.customerUserInfoId);
          
          //console.log(json.code)
        } else {
          Alert.alert("Invalid username or password");  
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
      <Text style={{marginTop:35,marginLeft:10}}>手机号码</Text>
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
      <TextInput
      style = {styles.account}
      placeholder={this.state.text1}
      defaultValue=""
      //keyboardType={Platform.OS != "ios" ? "numeric" : "number-pad"}
      onChangeText={(text) => {this.setState({ name: text})}}
      />
      <View style={{flexDirection:"row",marginLeft:0,marginBottom:10,marginTop:10}}>
          <Image style = {{height:20,width:20,marginTop:24}}
        source = {require('../images/telehealth_icon/account_icon_pswd.png')}
      />
      <Text style={{marginTop:25,marginLeft:10}}>账户密码</Text>
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
      placeholder="请输入您的密码"
      defaultValue=""
      secureTextEntry={true}
      onChangeText={(text) => {this.setState({ password: text})}}
      />
      <View style ={styles.container2}>
        <View style={{marginLeft:0}}>
        <TouchableOpacity style={styles.f_wrapper} onPress={() => this.props.navigation.navigate('忘记密码')}>
          <Text style={styles.f_Text}>忘记密码？</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop:20,marginLeft:130}} onPress={() => this.props.navigation.navigate('注册')}>
          <Text style={styles.r_Text}>注册账户</Text>
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
        <Text style={{color:"white"}}>登陆</Text>
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