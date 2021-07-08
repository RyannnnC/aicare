import React,{useEffect,useContext,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,AsyncStorage } from 'react-native';
import {styles} from '../../style';
import DataContext from '../../consumerContext';
import { ScrollView } from 'react-native-gesture-handler';

//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const AccountMain = ({navigation}) => {
  const [first,setFirst] = React.useState("");
  const [last,setLast] = React.useState("");
  const [email,setEmail] = React.useState("");


  const goInfo= () => {
    if(checkToken()){
      Alert.alert(
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
          onPress:()=>{removeToken(); user.action.clearstate()}

        }
        
      ]
      )
      return;
    }
    navigation.navigate("accountInfo");
    
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
          source = {require('../../images/emotion1.png')}
        />
        </View>
        <View style={{marginTop:50}}>
        <Text style={{ fontSize:20, fontWeight: '600',marginLeft:20, }}>{first.length==0 &&last.length==0?"未填写":first+" "+ last}</Text>
        <Text style={{ fontSize:14, fontWeight: '300',marginTop:10,marginLeft:20 }}>{email.length==0?"未填写":email}</Text>
        </View>
      </View>
      </TouchableOpacity>
      <ScrollView style={{marginTop:-16,paddingTop:15}}>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {goInfo} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/13.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>个人信息</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>{ if(checkToken()){
      Alert.alert(
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
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
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>医保信息</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>{ if(checkToken()){
      Alert.alert(
        "登陆提醒",
        "您还没登陆，如需使用此功能请移步注册登录",
        [
          {text:"取消",
            onPress:()=>console.log("cancel redirect"),
            style:"cancel"
        },{
          text:"注册登陆",
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
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>病史信息</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>Alert.alert("该模块还在升级中，敬请期待。")}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/6.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>电子处方</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress={()=>Alert.alert("该模块还在升级中，敬请期待。")}  >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/4.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>用药历史</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress={()=>Alert.alert("该模块还在升级中，敬请期待。")} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/12.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>疫苗记录</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>Alert.alert("该模块还在升级中，敬请期待。")}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/11.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>治愈历史</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar}  onPress={()=>Alert.alert("该模块还在升级中，敬请期待。")}>
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/5.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>检验报告</Text>
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
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>user.action.contact()} >
        <Image
          style = {{width: 22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/2.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>联系我们</Text>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:360}}>
      <View style={{marginLeft:-70}}>
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert(
      "提醒",
      user.token==-1?"点击确认前往注册登陆页面":"您确定要退出登陆吗？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: () =>{removeToken(); state.action.clearstate()} } //this should navigate to the login page
      ],
      { cancelable: false }
      )} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/14.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>{user.token==-1?"前往注册":"退出登录"}</Text>
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