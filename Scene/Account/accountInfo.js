import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class AccountInfo extends Component {

  render() {
    return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <Image style={styles.resumeImg}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View style={{alignItems: "flex-start" }}>
        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>姓名</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "林一"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_phone.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>电话</Text>
        </View>
        <TextInput style={styles.resumeInput} placeholder= "0403571888"/>

        <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_mail.png')}
          />
          <Text style={{ fontSize:18, fontWeight: '500' }}>邮箱</Text>
        </View>
          <View style={{marginTop:15, marginBottom:15,flexDirection: 'row'}}>
            <TextInput style={styles.resumeInput} placeholder= "657416708@gmail"/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('修改邮箱')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );}
}
