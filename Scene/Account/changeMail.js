import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class ChangeMail extends Component {

  render() {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <View style={{alignItems: "flex-start" }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_phone.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>新邮箱</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入新的邮箱"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/signup_icon_key.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>验证码</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入新邮箱内收到的验证码"/>

        </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );}
}
