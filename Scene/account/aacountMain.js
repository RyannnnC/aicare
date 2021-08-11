import React,{useEffect,useContext,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,AsyncStorage } from 'react-native';
import {styles} from '../../style';
import DataContext from '../../consumerContext';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from "../language"
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const AccountMain = ({navigation}) => {
  const [first,setFirst] = React.useState("");
  const [last,setLast] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [port,setPort]=React.useState("")

  const goInfo= () => {
    if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }
    navigation.navigate("accountInfo");
    
  }
  const changeLan=(lan)=>{
    if (lan==0){
      //chinese
      user.changeLan("zh")
      console.log(user.language)
      //send request to backend
      /*let url = 'http://'
      +user.url
      +'/aicare-customer-api/changeSessionLanauage?lang=en_US';
      fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': user.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        },
     
      })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        if (json.code === 0) {
          if(json.medicalInfo.firstName){
          setFirst(json.medicalInfo.firstName)
          }
          if(json.medicalInfo.lastName){
          setLast(json.medicalInfo.lastName)
          }
          if(json.medicalInfo.email){
          setEmail(json.medicalInfo.email)
          }

        } else {
          console.log(json.msg)
          //Alert.alert(json.msg);
        }
      }).catch(error => console.warn(error));*/
    }else{
      user.changeLan("en")
      //send request to backend
    }
  }
  const checkToken=()=>{
    if (user.token==-1){
      return true
    }else{
      return false
    }
  }
  const changePwd= () => {
    navigation.navigate("changePwd");
  }
  const goSetting= () => {
    navigation.navigate("setting");
  }
  const user=useContext(DataContext);
  
  const removeToken=async() =>{
    try {
      await AsyncStorage.removeItem("token");
      //await AsyncStorage.removeItem("firsttime");

      console.log("Remove token success");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  useEffect(() => {
    console.log(user.customerUserInfoId)
      let url = 'http://'
      +user.url
      +'/aicare-customer-api/customer/customer-info/query-medical-info?customerUserInfoId='+user.customerUserInfoId;
      fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': user.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
        },
     
      })
      .then((response) => response.json())
      .then((json) => {
        //this.setState({loading:false})
        if (json.code === 0) {
          if(json.medicalInfo.firstName){
          setFirst(json.medicalInfo.firstName)
          }
          if(json.medicalInfo.lastName){
          setLast(json.medicalInfo.lastName)
          }
          if(json.medicalInfo.email){
          setEmail(json.medicalInfo.email)
          }
          if (json.medicalInfo.profilePhoto){
            setPort(json.medicalInfo.profilePhoto)
          }

        } else {
          console.log(json.msg)
          //Alert.alert(json.msg);
        }
      }).catch(error => console.warn(error));
        },[])

  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white",marginTop:80 }}>
      <View style={{height:80}}></View>
      <TouchableOpacity onPress={goInfo}>
      <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 1,
                },
                shadowOpacity: 0.13,
                shadowRadius: 1.65,

                elevation: 2, width: 430, height: 240,marginTop:-170,marginBottom: 20, alignItems: "center", flexDirection: 'row',backgroundColor:"#F4FAFA"}}>
        <View style={{marginLeft:60,marginTop:50}}>
        <Image
          style = {{borderRadius: 80 / 2,
            overflow: "hidden",
            borderWidth: 5,
            borderColor: "white",width:80,height:80}}
          source = {port.length==0?require('../../images/emotion1.png'):{uri:port}}
        />
        </View>
        <View style={{marginTop:50}}>
        <Text style={{ fontSize:20, fontWeight: '600',marginLeft:20, }}>{first.length==0 &&last.length==0?I18n.t("not_fiiled"):first+" "+ last}</Text>
        <Text style={{ fontSize:14, fontWeight: '300',marginTop:10,marginLeft:20 }}>{email.length==0?I18n.t("not_fiiled"):email}</Text>
        </View>
      </View>
      </TouchableOpacity>
      <ScrollView style={{marginTop:-16,paddingTop:15}} >
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress = {goInfo} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/13.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("personalinfo_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>{ if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }navigation.navigate("cardInfo")}} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/8.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>{I18n.t("medicare_info_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>{ if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }navigation.navigate("historyInfo")}}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/6.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("medical_history_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>{ if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }navigation.navigate("prescription")}}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/6.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("electronic_prescription_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress={()=>Alert.alert(I18n.t("updating_module"))}  >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/4.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("medication_history_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress={()=>Alert.alert(I18n.t("updating_module"))} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/12.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("vaccine_record_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>Alert.alert(I18n.t("updating_module"))}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/5.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("pathology_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      {/*
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>

      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert("收藏功能即将上线。")}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/telehealth_icon/account_icon_like_normal.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>我的收藏</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert("消息功能即将上线。")}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/telehealth_icon/signup_icon_mail.png')}
        />
        <Text style={{marginLeft:-170, fontSize:18, fontWeight: '400' }}>我的消息</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert("修改密码功能即将上线。")}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/signup_icon_pswd.png')}
        />
        <Text style={{marginLeft:-170, fontSize:18, fontWeight: '400' }}>修改密码</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress ={()=>Alert.alert("个性华设置功能即将上线。")}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/account_icon_setting.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>我的设置</Text>
      </TouchableOpacity>
      </View>
      </View>
      */}
      {/*<View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>{ if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }Alert.alert(
      I18n.t("language_switch"),
      I18n.t("lan_text"),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: I18n.t("chi"), onPress: () =>console.log(0)} ,
        { text: I18n.t("eng"), onPress: () =>console.log(1)} //this should navigate to the login page
      ],
      { cancelable: false }
      )}}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/language.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>{I18n.t("language_switch")}</Text>
      </TouchableOpacity>
      </View>
          </View>*/}
           
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>user.action.contact()} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/2.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{I18n.t("contact_us_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:0}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert(
      I18n.t("logout_account"),
      user.token==-1?I18n.t("login_notice_text"):I18n.t("log_out_alert"),
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: I18n.t("confirm_logout"), onPress: () =>{removeToken(); state.action.clearstate()} } //this should navigate to the login page
      ],
      { cancelable: false }
      )} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/14.png')}
        />
        <Text style={{ marginLeft:0,fontSize:18, fontWeight: '400' }}>{user.token==-1?I18n.t("signup_account"):I18n.t("logout_account")}</Text>
      </TouchableOpacity>
      </View>
      </View>
      
      </ScrollView>
    </View>
     )}
     </DataContext.Consumer>
  );
}
export default AccountMain;