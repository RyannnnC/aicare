import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../../style';
//import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


const AccountMain = ({navigation}) => {
  const goInfo= () => {
    navigation.navigate("accountInfo");
  }
  const changePwd= () => {
    navigation.navigate("changePwd");
  }
  const goSetting= () => {
    navigation.navigate("setting");
  }
  const createAlert = () =>
    Alert.alert(
      "提醒",
      "您确定要推出登陆吗？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确定", onPress: () => console.log("OK Pressed") } //this should navigate to the login page
      ],
      { cancelable: false }
    );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
      <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
        <Image
          style = {styles.personIcon}
          source = {require('../../images/home_img_person.png')}
        />
        <View>
        <Text style={{ fontSize:20, fontWeight: '600' }}>林女士</Text>
        <Text style={{ fontSize:14, fontWeight: '300' }}>657416708xy@gmail.com</Text>
        </View>
      </View>
      
      
      <TouchableOpacity style={styles.profileBar} onPress = {goInfo} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/singup_icon_name.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>个人信息</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress = {changePwd}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/signup_icon_pswd.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>修改密码</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress ={goSetting}>
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/account_icon_setting.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>我的设置</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBar} onPress = {createAlert} >
        <Image
          style = {styles.smallIconImg}
          source={require('../../images/account_icon_logout.png')}
        />
        <Text style={{ fontSize:18, fontWeight: '400' }}>退出登录</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: "center" }}>
        <Image
          source={require('../../images/logo.png')}
          style = {{width:85, height:30}}
        />
        <Text style={{fontSize:12, color:'#68B0AB'}}>+61 0403555432</Text>
       </View>
    </View>
  );
}
export default AccountMain;