import React, { useContext,useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch ,ScrollView,Platform} from 'react-native';
import {styles} from '../style';
import { StackActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import * as Localization from 'expo-localization';
import RNPickerSelect from 'react-native-picker-select';
import DataContext from "../consumerContext";
const Result = ({navigation}) => {
    const user=useContext(DataContext)
    const [img,SetImg]=useState("")

    const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
    console.log(telephone);
    console.log(postcode);
        
    /*let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/save'
    
    fetch(url,{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'sso-auth-token': user.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'content-type, sso-auth-token',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
      },
      body: JSON.stringify({
        name: name,
        gender:gender,
        age:age,
        mobile:telephone,
        address:address,
        postCode:postcode,   
        state:state,    
        email:email,
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("提交成功");
          console.log(json.msg);
        } else {
          //console.log(json.msg)
          console.log(base);
          alert('个人信息提交失败');
        }
      });
      if(selectedType=="Medicare"){
        let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/medical-card'
    
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
      },
      body: JSON.stringify({
        category:selectedType,
        name:cardName?cardName:"",
        expireDate:expire?expire:"",
        number:cardNumber?cardNumber:"",
        serialNumber:serial?serial:"",
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("医疗信息提交成功");
          console.log(json.msg);
        } else {
          alert('医疗信息提交失败');
        }
      });
      }else if(selectedType=="私人保险"){
        let url = 'http://'+user.url+'/aicare-customer-api/customer/customer-info/medical-card'
    
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
      },
      body: JSON.stringify({
        category:"私人保险",
        name:cardName,
        number:cardNumber,
      })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 0) {
          //alert("医疗信息提交成功");
          console.log(json.msg);
        } else {
          console.log(json.msg)
          alert('医疗信息提交失败');
        }
      });
      }   */
    }
    
        
    const goEmail= () => {
        navigation.navigate("changeEmail")
    }
    const [selectedType, setSelectedType] = React.useState("None");
    const [name, setName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [age, setAge] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [postcode, setPostcode] = React.useState("");
    const [state, setState] = React.useState("");
    const [cardName, setcardName] = React.useState("");
    const [expire, setExpire] = React.useState("");
    const [serial, setSerial] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [email, setEmail] = React.useState("");

    
    
    
    return (
        <ScrollView style={{marginTop:-20,backgroundColor:"white"}}>
        <View style={styles.container}>
        <View style={{height:50}}></View>
        <View style={{flexDirection:"row",marginBottom:20}}>
        <TouchableOpacity onPress = {goBack} style={{marginLeft:-135}}>
          <Image
            style = {styles.arrow_image}
            source={require('../images/icon/2/Arrow_left.png')}
          />
        </TouchableOpacity>
    
        <Text style = {{color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:100,}}>情绪识别</Text>
        </View>
        <Text style={{marginTop:15,marginLeft:-160,fontSize:14, fontWeight:"500"}}>早上好，Chris Ding。</Text>
        <Image style = {{width:340,height:550,marginTop:15}}
            source= {require('../images/bg.png')}
          />
    
        <View style={{marginLeft:-75,marginTop:40}}>
        
        {true?<TouchableOpacity 
        onPress={()=>Alert.alert("已联系李医生")}
            style={{
              padding:10,
              width:200,
              marginTop:0,
              height:45,
              marginLeft:95,
              alignItems: 'center',
              borderWidth:1.5,
              borderColor:'#8FD7D3',
              borderRadius:25,}}
              >
        <Text style={{color:"#8FD7D3",fontSize:16,fontWeight:"500"}}>咨询医生</Text>
      </TouchableOpacity>:null}
        </View>
        <View style={{height:300}}></View>
        </View>
        </ScrollView>
    );
}
  
export default Result;