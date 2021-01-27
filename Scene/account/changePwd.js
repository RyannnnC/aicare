import React from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
const ChangePwd = ({navigation}) => {
    const goBack= () => {
        navigation.dispatch(StackActions.pop(1))
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress = {goBack}>
                <Image
                style = {styles.arrow_image}
                source={require('../../images/icon/2/Arrow_left.png')}
                />
            </TouchableOpacity>

            <Text style = {styles.service}>修改密码</Text>
            <Image style = {styles.address_image}
                source= {require('../../images/oldPwd.png')}
            />
            <TextInput style = {styles.account} placeholder="请输入旧密码。"
            onChangeText={(text) => {text => setText(text);state.action.changename(text)}}
            />
            <Image style = {styles.address_image}
                source= {require('../../images/newPwd.png')}
            />
            <TextInput style = {styles.account} placeholder="请输入新密码。"
            onChangeText={(text) => {text => setText(text);state.action.changename(text)}}
            />
            <Image style = {styles.address_image}
                source= {require('../../images/confirm.png')}
            />
            <TextInput style = {styles.account} placeholder="请再次输入新密码。"
            onChangeText={(text) => {text => setText(text);state.action.changename(text)}}
            />

            <TouchableOpacity style={styles.next_wrapper} onPress ={goBack}>
                <Text style={styles.onsite_text}>确认</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ChangePwd;
  


