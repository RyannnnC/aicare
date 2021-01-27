import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';

const AccountInfo = ({navigation}) => {
    const goBack= () => {
        navigation.dispatch(StackActions.pop(1))
    }
    const goEmail= () => {
        navigation.navigate("changeEmail")
    }
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress = {goBack}>
          <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>
    
        <Text style = {styles.service}>个人信息</Text>
        <Image style = {styles.personIcon}
            source= {require('../../images/home_img_person.png')}
          />
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Image
          style = {styles.smallIconImg}
          source={require('../../images/singup_icon_name.png')}
        />
            <Text>基本信息</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>姓名： </Text>
            <Text>杨一</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>性别： </Text>
            <Text>女</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>年龄： </Text>
            <Text>65</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>电话： </Text>
            <Text>0462093874</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>地址： </Text>
            <Text>1001/17 unsw st,Kengsinton</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>编码： </Text>
            <Text>2038</Text>
            <Text>城市： </Text>
            <Text>悉尼</Text>
        </View>
        <View style={{ width: 300, height: 50, marginBottom: 20, alignItems: "center", flexDirection: 'row'}}>
            <Text>邮箱： </Text>
            <Text>182371238@gmail.com</Text>
            <TouchableOpacity onPress = {goEmail}>
                <Image style = {styles.comment_image}
                source= {require('../../images/icon/2/Arrow_right.png')}
                />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.next_wrapper} onPress ={goBack}>
            <Text style={styles.onsite_text}>确认</Text>
        </TouchableOpacity>
        </View>
    );
}
  
export default AccountInfo;
  
  