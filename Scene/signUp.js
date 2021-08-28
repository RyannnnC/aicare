import React ,{Component}from 'react';
import {Platform, Alert,Text, Button, View, Switch,KeyboardAvoidingView, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput,AsyncStorage} from 'react-native';
import {styles} from '../style';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import DataContext from "../consumerContext";
import I18n from "./language"
import PhoneInput from "react-native-phone-number-input";
import * as Localization from 'expo-localization';

class Signup extends Component {
  state = {
    name:"",
    phone:"",
    mail:"",
    password:"",
    confirm: "",
    userCode:"",
    mailCode:"",
    checked1: true,
    checked2: false,
    checked3:false,
    press:false,
  }
  storeToken = async (token,id) => {
    try {
       await AsyncStorage.setItem("token", token);
       await AsyncStorage.setItem("infoId", JSON.stringify(id));
       SystemLanguage=Localization.locale.slice(0,2)
       
       if(SystemLanguage){
         this.context.action.changeLan({language:SystemLanguage})
       }
  var lan = "en";
  if(SystemLanguage=="en"){
    lan= "zh_CN"
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
       console.log("Store token success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  sendRequest() {
    

    if(this.state.name.length==0){
      Alert.alert(I18n.t("fill_name"))
      return
    }

    if(this.state.phone.length==0){
      Alert.alert(I18n.t("fill_mobile"))
      return
    }
    
    if(this.state.password.length==0){
      Alert.alert(I18n.t("fill_password"))
      return
    }
    if(this.state.password.length<6){
      Alert.alert(I18n.t("password_length"))
      return
    }
    if (this.state.confirm != this.state.password) {
      Alert.alert(I18n.t("same_password"))
      return;
    } 
    if(this.state.userCode.length==0){
      Alert.alert(I18n.t("fill_code"))
      return
    }
    if(!this.state.checked3){
      Alert.alert(I18n.t("read_TOS"))
      return
    }
    if(!this.state.press){
      Alert.alert(I18n.t("press_send"))
      return
    }
    let s = this.state;
    let url = 'http://'+this.context.url+'/aicare-customer-api/customer/user/register?'
      +'username='+ s.name
      +'&password=' + s.password
      +'&email=' + s.mail
      +'&mobile=' + s.phone
      +'&clientType=3'
      +'&code=' + s.userCode
      +'&appType=1'+"&type=mobile"
      fetch(url,{
        method: 'POST',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.msg)
        if(json.code==0){
           //console.log(json.msg);
           Alert.alert(I18n.t("signup_success"))
           console.log(json)
           this.storeToken(json.token,json.customerUserInfoId);
          //this.props.navigation.navigate('登陆');
          this.context.action.changetoken(json.token);
          this.context.action.changeInfoId(json.customerUserInfoId)
        }else{
          Alert.alert(json.msg)
        }
      });
  }


  

  sendCode() {
    if (this.state.checked1) {
      let p = this.state.phone;
      let url = "http://"+this.context.url+"/aicare-customer-api/customer/user/send?"
      +'&type=mobile'
      +'&mobile=' + p;
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
        //this.setState({mailCode: json.code});
        //console.log(json.code);
        if(json.code==0){
        console.log(json.msg);
        this.setState({press:true})
        Alert.alert(I18n.t("code_send"))
        }else{
          Alert.alert(I18n.t("fail"))
        }
      });
    } else {
      let m = this.state.mail;
      let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/send?"
      +'&email=' + m+'&type=email';
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
        if(json.code==0){
          console.log(json.msg);
          Alert.alert("验证码已发送。")
          }else{
            Alert.alert("验证码请求失败，请检查网络或咨询客服。")
          }
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <ScrollView style={{flex:1}}>

      <View style={{ flex:1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
          <View style={{alignItems: 'flex-start',marginTop:40 }}>
          <View style={{marginTop:35, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/telehealth_icon/account_icon_info.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>{I18n.t("name_up")}</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t("name_up_pd")}
          onChangeText={(text) => {this.setState({ name: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_phone.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>{I18n.t("mobile")}</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5,flexDirection:"row"}}>
          <PhoneInput
            //ref={phoneInput}
            //defaultValue={value}
            defaultCode="AU"
            layout="first"
            placeholder={I18n.t("m_pd")}
            onChangeFormattedText={(text) => {
              //console.log("format")
              console.log(text.slice(1));
              this.setState({phone:text.slice(1)})
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          {/*<TextInput style={styles.resumeInput}
                keyboardType={Platform.OS != "ios" ? "numeric" : "number-pad"}
          placeholder={I18n.t("mobile_up")}
          onChangeText={(text) => {this.setState({ phone: text})}}
          />*/}
          </View>

          

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/telehealth_icon/account_icon_pswd.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>{I18n.t("password_up")}</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t("ps_up_pd")}
          secureTextEntry={true}

          onChangeText={(text) => {this.setState({ password: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_confirm.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>{I18n.t("confirmation_up")}</Text>
          </View>
          <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10,marginBottom:5}}>
          <TextInput style={styles.resumeInput}
          placeholder={I18n.t("confirmation_up_pd")}
          secureTextEntry={true}

          onChangeText={(text) => {this.setState({ confirm: text})}}
          />
          </View>

          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <Image
              style = {styles.smallIconImg}
              source={require('../images/signup_icon_link.png')}
            />
            <Text style={{ fontSize:16, fontWeight: '500' }}>{I18n.t("verification")}</Text>
          </View>

         
          <View style={{flexDirection: 'row'}}>
            <View style={{borderBottomWidth:1, borderBottomColor:'#BBBBBB',marginLeft:10}}>
            <TextInput style={{width:200}}
            placeholder= {I18n.t("verification_pd")}
            onChangeText={(text) => {this.setState({ userCode: text})}}
            />
            </View>
            <TouchableOpacity style={{borderWidth:0,borderColor:"#BBBBBB",borderRadius:10,width:100,height:30,padding:5,paddingLeft:8,marginLeft:3,backgroundColor:"#FF7E67"}}
              onPress={()=>this.sendCode()}
            >
              <Text style={{ fontSize:13, fontWeight: '300',color:"white" }}>{I18n.t("send")}</Text>
            </TouchableOpacity>
          </View>

          </View>
          <View style={{marginTop:60, marginBottom:0,flexDirection: 'row',marginLeft:-15}}>
            <CheckBox
              center
              iconRight
              uncheckedIcon='square-o'
              checkedIcon='check-square-o'
              checkedColor='red'
              size={this.state.size}
              checked={this.state.checked3}
              onPress={() => {
                console.log("switch to mail");
                this.setState({
                checked3:!this.state.checked3
              })}}
             />
             <Text style={{marginTop:18,marginLeft:-18}}>{I18n.t("read")}</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('数据协议')}>
               <Text style={{marginLeft:2,marginTop:18,color:"#8FD7D3"}}>{I18n.t("TOS")}</Text>
             </TouchableOpacity>
          </View>
          <TouchableOpacity style={{width: 280,
   height: 40,
   marginTop: 10,
   backgroundColor: "#8FD7D3",
   borderRadius: 20,
   alignItems: 'center',
   justifyContent: "center",}} onPress={()=>{this.sendRequest()}}>
            <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>{I18n.t("confirm_cancel")}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
      <Image style = {{marginTop:90,
    width:120,
    height:32,}}
        source = {require('../images/logo.png')}
      />
      </View>
      </View>
      </ScrollView>

      </KeyboardAvoidingView>
  );}
}
Signup.contextType = DataContext;
export default Signup;