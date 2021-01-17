import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class TransferOut extends Component {
  render() {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <View style={{alignItems: "Left" }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/tab_icon_money.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>转账金额</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入需要转出的金额"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_card.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>BSB</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入您的6位BSB"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_card.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>Account Number</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入您的8位银行账户号码"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>持卡人姓名</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "请输入持卡人姓名"/>

        </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );}
}
