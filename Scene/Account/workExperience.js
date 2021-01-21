import React ,{Component}from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class WorkExperience extends Component {

  render() {
  return (
    <SafeAreaView style={{ flex:1, alignItems: "Left" }}>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
      <Image
        style = {styles.smallIconImg}
        source={require('../../images/providerImg/account_icon_profile_normal.png')}
      />
      <Text style={{ fontSize:16, fontWeight: '400' }}>经历1</Text>
      <TouchableOpacity style={{ marginTop: 5,marginBottom: 5,marginLeft:180}}>
        <Image
          style = {styles.smallAddImg}
          source={require('../../images/providerImg/account_icon_add.png')}
        />
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>公司</Text>
        <TextInput style={styles.resumeInput} placeholder= "Kingsford养老院"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>职位</Text>
        <TextInput style={styles.resumeInput} placeholder= "护工"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>时间</Text>
        <TextInput style={styles.resumeInput} placeholder= "2019.10 - 2020.10"/>
      </View>
      <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
        <Text style={{ fontSize:16, fontWeight: '400' }}>在职经历</Text>
        <TextInput style={styles.resumeInput}/>
      </View>
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>确认</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );}
}
