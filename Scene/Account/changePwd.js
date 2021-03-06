import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class ChangePwd extends Component {

  render() {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor:'white'}}>
        <View style={{alignItems: "flex-start" }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_pswd.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>旧密码</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入您的密码"/>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_pswd.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>新密码</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入您的新密码"/>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_confirm.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>确认</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请再次输入您的新密码"/>
        </View>

        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );}
}
