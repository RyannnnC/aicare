import React,{useEffect,useContext,useState} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../../style';
import DataContext from '../../consumerContext';
import { ScrollView } from 'react-native-gesture-handler';

//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const AccountMain = ({navigation}) => {
  const [info,setInfo] = React.useState({});
  const goInfo= () => {
    navigation.navigate("accountInfo");
  }
  const changePwd= () => {
    navigation.navigate("changePwd");
  }
  const goSetting= () => {
    navigation.navigate("setting");
  }
  user=useContext(DataContext);

  useEffect(() => {
    
    let url = "http://"+user.url+"/aicare-customer-api/customer/customer-info/all-info";
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
            }})
            .then((response) => response.json())
            .then((json) => {
              if(json.code==500){
                console.log(json.msg);
                Alert.alert('查询失败');
              }else if (json.code==2 || json.code==0){
                console.log(json.user_base_info);
                setInfo(json.user_base_info);
              }else{
                console.log("got nothing")
              }
            }).catch(error => console.warn(error));
    },[])

  return (
    <DataContext.Consumer>
    {(state)  => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white",marginTop:150 }}>
      <TouchableOpacity onPress={goInfo}>
      <View style={{shadowColor:"000000",shadowOffset: {
	              width: 0,
	              height: 1,
                },
                shadowOpacity: 0.13,
                shadowRadius: 1.65,

                elevation: 2, width: 430, height: 200,marginTop:-170,marginBottom: 20, alignItems: "center", flexDirection: 'row',backgroundColor:"#F4FAFA"}}>
        <View style={{marginLeft:60}}>
        <Image
          style = {{borderRadius: 80 / 2,
            overflow: "hidden",
            borderWidth: 5,
            borderColor: "white",width:80,height:80}}
          source = {require('../../images/home_img_person.png')}
        />
        </View>
        <View>
        <Text style={{ fontSize:20, fontWeight: '600',marginLeft:20, }}>{info.name?info.name:"姓名未填写"}</Text>
        <Text style={{ fontSize:14, fontWeight: '300',marginTop:10,marginLeft:20 }}>{info.email?info.email:"邮箱未填写"}</Text>
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
          source={require('../../images/singup_icon_name.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>个人信息</Text>
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
      <TouchableOpacity style={styles.profileBar} onPress = {()=>Alert.alert(
      "提醒",
      "您确定要推出登陆吗？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: () => state.action.clearstate() } //this should navigate to the login page
      ],
      { cancelable: false }
      )} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/account_icon_logout.png')}
        />
        <Text style={{ marginLeft:-170,fontSize:18, fontWeight: '400' }}>退出登录</Text>
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