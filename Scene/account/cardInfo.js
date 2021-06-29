import React, { useContext,useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch ,ScrollView,Platform} from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

import RNPickerSelect from 'react-native-picker-select';
import DataContext from "../../consumerContext";
const CardInfo = ({navigation}) => {
    const user=useContext(DataContext)
    useEffect(() => {
      console.log(user.customerUserInfoId)
        let url = 'http://'
        +user.url
        +'/aicare-customer-api/customer/customer-info/query-medical-info?customerUserInfoId='+user.customerUserInfoId;
        fetch(url,{
          method: 'GET',
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
          },
       
        })
        .then((response) => response.json())
        .then((json) => {
          //this.setState({loading:false})
          if (json.code === 0) {
            if(json.medicalInfo&&json.medicalInfo.medicareCard&&json.medicalInfo.medicareCard[0]){
            setCard(json.medicalInfo.medicareCard[0])
            setExpire(json.medicalInfo.medicareCard[0].expireDate)
            setSerial(json.medicalInfo.medicareCard[0].serialNumber)
            setCardNumber(json.medicalInfo.medicareCard[0].number)
            setDob(json.medicalInfo.medicareCard[0].dateOfBirth)

            }
  
  
          } else {
            console.log(json.msg)
            Alert.alert(json.msg)
          }
        }).catch(error => console.warn(error));
          },[])
        const update=()=>{
            let url = 'http://'
            +user.url
            +'/aicare-customer-api/customer/customer-info/save?customerInfoId='+user.customerUserInfoId;
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
            }, body: JSON.stringify({
              medicareCard:[
                {
                id: card.id,
                category: "Medicare",
                firstName: card.firstName,
                lastName: card.lastName,
                gender: card.gender,
                dateOfBirth: dob,
                expireDate: expire,
                number: cardNumber,
                serialNumber: serial,
                customerId: card.customerId,
                customerRealId: card.customerRealId
                }
              ]
            })
          })
            .then((response) => response.json())
            .then((json) => {
              //this.setState({loading:false})
              if (json.code === 0) {
                Alert.alert("信息保存成功")
                console.log(json.msg)
      
              } else {
                console.log(json.msg)
                Alert.alert(json.msg);
              }
            }).catch(error => console.warn(error));
          }
    const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
    //console.log(telephone);
    //console.log(postcode);
        
    }
        
    const goEmail= () => {
        navigation.navigate("changeEmail")
    }
    const [card, setCard] = React.useState("");

    const [expire, setExpire] = React.useState("");
    const [serial, setSerial] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [dob, setDob] = React.useState("");


    return (
        <ScrollView style={{marginTop:-20,backgroundColor:"white"}}>
        <View style={styles.container}>
        <View style={{height:50}}></View>
        <View style={{flexDirection:"row",marginBottom:20}}>
        <TouchableOpacity onPress = {goBack} style={{marginLeft:-135}}>
          <Image
            style = {styles.arrow_image}
            source={require('../../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>
    
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:100,}}>医保信息</Text>
        </View>
        <Image style = {{width:80,height:80,borderRadius:40}}
            source= {require('../../images/chris.png')}
          />
        <View style={{ marginTop:10,marginLeft:-20,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row'}}>
            <Image
          style = {{width:22,
            height: 22,
            marginLeft:10,
            marginRight:10,}}
          source={require('../../images/telehealth_icon/service_telehealth_select_icon_calender.png')}
        />
            <Text style={{fontSize:16}}>医保卡信息</Text>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>Medicare卡号码： </Text>
            <TextInput defaultValue={cardNumber}  placeholder="请输入您的医保卡号码" placeholderTextColor="grey" onChangeText={text => setCardNumber(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>序列号： </Text>
            <TextInput placeholder="请输入序列号" defaultValue={serial}  placeholderTextColor="grey" onChangeText={text => setSerial(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>生日：</Text>
            <TextInput placeholder="请输入医保卡关联的出生日期" defaultValue={dob}  placeholderTextColor="grey" onChangeText={text => setDob(text)}></TextInput>
        </View>
        <View style={{ marginLeft:25,width: 300, height: 50, marginBottom: 0, alignItems: "center", flexDirection: 'row',borderBottomColor:"#EEEEEE",borderBottomWidth:1.5,width:320}}>
            <Text>过期日期：</Text>
            <TextInput placeholder="请输入卡的到期日期" defaultValue={expire} placeholderTextColor="grey" onChangeText={text => setExpire(text)}></TextInput>
        </View>
       

    
        <View style={{marginLeft:-75,marginTop:20}}>
        <TouchableOpacity style={styles.next_wrapper} onPress ={update}>
            <Text style={styles.onsite_text}>确认</Text>
        </TouchableOpacity>
        </View>
        <View style={{height:300}}></View>
        </View>
        </ScrollView>
    );
}
  
export default CardInfo;