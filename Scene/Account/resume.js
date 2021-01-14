import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,ScrollView,SafeAreaView,TextInput } from 'react-native';
import {styles} from '../providerStyle';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Resume() {
  return (
    <SafeAreaView style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={{ flex: 1 }}>
        <Image style={styles.resumeImg}
          source = {require('../../images/providerImg/home_img_person.png')}
        />
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/singup_icon_name.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>基本信息</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>姓名</Text>
          <TextInput style={styles.resumeInput} placeholder= "林三"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>性别</Text>
          <TextInput style={styles.resumeInput} placeholder= "女"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>年龄</Text>
          <TextInput style={styles.resumeInput} placeholder= "35"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>电话</Text>
          <TextInput style={styles.resumeInput} placeholder= "0403571833"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>地址</Text>
          <TextInput style={styles.resumeInput} placeholder= "1001/1 Mooltan Avanue"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>编码</Text>
          <TextInput style={styles.resumeInput1} placeholder= "2113"/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>城市</Text>
          <TextInput style={styles.resumeInput1} placeholder= "悉尼"/>
        </View>
        <View style={{flexDirection: 'row', marginTop:10, marginBottom:10}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_profile_normal.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>个人背景</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>最高学历</Text>
          <TextInput style={styles.resumeInput} placeholder= "本科"/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ fontSize:16, fontWeight: '400' }}>工作时长</Text>
          <TextInput style={styles.resumeInput} placeholder= "1年"/>
        </View>
        <View>
          <Text style={{ fontSize:16, fontWeight: '400' }}>工作经历（选填）</Text>
          <TextInput style={styles.resumeInput2} placeholder= "林三"/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>证书执照（选填）</Text>
          <TextInput style={styles.resumeInput2} placeholder= "林三"/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>个人简介（选填）</Text>
          <TextInput style={styles.resumeInput2} placeholder= "林三"/>
          <Text style={{ fontSize:16, fontWeight: '400' }}>证件上传</Text>
          <TextInput style={styles.resumeInput2} placeholder= "林三"/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style = {styles.smallIconImg}
            source={require('../../images/providerImg/account_icon_job.png')}
            />
            <Text style={{ fontSize:18, fontWeight: '500' }}>工作意向</Text>
        </View>
            <Text style={{ fontSize:16, fontWeight: '400' }}>工作时间</Text>
            <TouchableOpacity style={styles.resumeButton}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>周一</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resumeButton}>
              <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>周二</Text>
            </TouchableOpacity>
            <Text style={{ fontSize:16, fontWeight: '400' }}>服务类型（选填）</Text>
        <TouchableOpacity style={styles.resumeButton}>
          <Text style={{ fontSize:16, fontWeight: '400', color: '#ffffff' }}>保存</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
