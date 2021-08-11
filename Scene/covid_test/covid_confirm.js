import React,{useContext, useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity, TextInput,Switch,ScrollView,Platform,Modal,ActivityIndicator } from 'react-native';
import {styles} from '../../style';
import { CheckBox } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
//import DataContext from "../consumerContext"
import call from 'react-native-phone-call'
import DataContext from "../../consumerContext";
import SwitchSelector from "react-native-switch-selector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import I18n from "../language"

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function covid_confirm({navigation,route}) {``
  const user=useContext(DataContext);
  
 
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  //const { scheduleId,date,doctype,address,docName,startTime,endTime,teleFlg,Did,orgId} = route.params;
 
  const {dob,first,last,gender,add,sub,sta,post,mobile,email,pass,nat,ncp,ncm,des,air,dep,book,center} = route.params;

  
  
  
  const goPay=()=>{
    if(checked1){
    let url = 'http://'
    +user.url
    +'/aicare-customer-api/customer/physicaltest/create_order';
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
        address: add,
        appointDate: book,
        channel: "CardPayment",
        city: sub,
        country: des,
        currency: "AUD",
        customerState: "NSW",
        dateOfBirth: dob,
        departureDate: dep,
        email: email,
        firstName: first,
        flight: air,
        lastName: last,
        mobile: "61"+mobile,
        nationality: nat,
        ncm: ncm?1:0,
        ncp: ncp?1:0,
        orgName: center,
        passport: pass,
        postcode: post,
        sex: gender,
        state: sta
      
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        //Alert.alert("信息保存成功")
        console.log(json.msg)
        //Alert.alert(json.appointmentId)
        navigation.navigate("covid_pay",{url:json.order_url,orderId:json.partnerOrderId})
      } else {
        console.log(json.msg)
        Alert.alert(json.msg);
      }
    }).catch(error => console.warn(error));
  }
  }

 


 
  const [checked1, setChecked1] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(false);
  return (

    <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:"white"}} style={{backgroundColor:"white"}} enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    >

    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:45,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60,marginLeft:35}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {{    color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:20,}}>{"新冠检测"}</Text>
    </View>
    <Image
    style = {{width:350,height:60,marginTop:20}}
        source={require('../../images/progress3.png')}
      />
    <View style={{marginTop:0,marginLeft:-160,width:250}}>
    <Text style={{marginLeft:30,marginTop:20,fontSize:17,fontWeight:"500"}}>信息确认</Text>
    <View style={{flexDirection:"row"}}>  
      <Text style={{fontSize:16,marginLeft:30}}>预约项目 Test</Text>
      <View>
    {ncp?<View><Text style={{marginLeft:30,}}>新冠病毒核酸检测</Text>
      <Text style={{marginLeft:30}}>COVID-19 Real Time RT-PCR</Text></View>:null}
      
{ncm?<View><Text style={{marginLeft:30}}>新冠病毒血清特异性lgM抗体检测</Text>
      <Text style={{marginLeft:30}}>COVID_19 Real Time lgM Antibody Test (NCM)</Text></View>:null}
      
      </View>
</View>
<View style={{flexDirection:"row"}}>  
      <Text style={{fontSize:16,marginLeft:30}}>预约日期 Date</Text>
      
      <Text style={{marginLeft:30}}>{book}</Text>
      
      </View>

      <View style={{flexDirection:"row",}}>  
      <Text style={{fontSize:16,marginLeft:30}}>检测机构 Centre</Text>
      <View>
      <Text style={{marginLeft:30}}>{center}</Text>
      </View>
</View>

<View style={{flexDirection:"row",borderTopWidth:0.5,marginTop:15}}>  
      <Text style={{marginLeft:30}}>名 FirstName</Text>
      
      <Text style={{marginLeft:30}}>{first}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>姓 LastName</Text>
      
      <Text style={{marginLeft:30}}>{last}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>性别 Gender</Text>
      
      <Text style={{marginLeft:30}}>{gender==1?"Male":"Female"}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>出生日期 DoB</Text>
      
      <Text style={{marginLeft:30}}>{dob}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>住址 Address</Text>
      
      <Text style={{marginLeft:30}}>{add}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>电话 Mobile</Text>
      
      <Text style={{marginLeft:30}}>+61 {mobile}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>邮箱 Email</Text>
      
      <Text style={{marginLeft:30}}>{email}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>护照 Passport</Text>
      
      <Text style={{marginLeft:30}}>{pass}</Text>
      
      </View>
      <View style={{flexDirection:"row",borderBottomWidth:0.5,marginTop:5}}>  
      <Text style={{marginLeft:30}}>国籍 Nationality</Text>
      
      <Text style={{marginLeft:30}}>{nat}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>费用 Charge</Text>
      
      <Text style={{marginLeft:30}}>$ {ncp?ncm?240:150:ncm?90:0}</Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>平台手续费 Surcharge</Text>
      
      <Text style={{marginLeft:30}}>$ 8 </Text>
      
      </View>
      <View style={{flexDirection:"row",marginTop:5}}>  
      <Text style={{marginLeft:30}}>总共 Total charge</Text>
      
      <Text style={{marginLeft:30}}>$ {ncp?ncm?248:158:ncm?98:0}</Text>
      
      </View>
    </View>
    

    
    
    
    
    
   
    <View style = {{marginTop:5,alignItems:"flex-start",width:330,marginLeft:-50}}>
      
        
    <View style={{marginTop:0,flexDirection:"row"}}>
    <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginLeft:0}}
            onPress={() => {
                setChecked1(!checked1)
         
            }}
          />
          <View>
          <Text style={{marginTop:20,marginLeft:-10}}>
            我确认以上信息填写无误，且已阅读Aicare平台使用须知。
          </Text>

          </View>
    </View>
    <View style={{marginTop:0,flexDirection:"row"}}>
    <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginLeft:0}}
            onPress={() => {
            setChecked3(!checked3)
         
            }}
          />
          <View>
          <Text style={{marginTop:20,marginLeft:-10}}>
            我确认出于旅行目的，支付此检测，我了解付款费用无法退还，且同意检测报告将通过电子邮件方式发送至我制定的邮箱地址。
          </Text>

          </View>
    </View>
    <View style={{marginLeft:-20}}> 
    <View style={{marginTop:30}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {()=>goPay()}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>支付</Text>
    </TouchableOpacity>
    </View>
    </View>
    
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{width:60,height:60,borderRadius:20,marginBottom:20,marginLeft:280,marginTop:50}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    
    
  
  </View>
  
  </KeyboardAwareScrollView>

  )}

