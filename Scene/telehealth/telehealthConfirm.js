import React,{useState,useContext} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,Modal } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
//import DataContext from '../consumerContext';
import { ScrollView, State } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import call from 'react-native-phone-call'
import DataContext from "../../consumerContext";

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function Confirm({route,navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useContext(DataContext);
  const { content,scheduleId,type,date,doctype,address,docName,startTime,endTime} = route.params;

  const [text, setText] = useState(content.name);
  const [text1, setText1] = useState('');
  const makecall=()=>{
    call(args).catch(console.error)
  }

  const sendRequest=()=>{
    //let str = JSON.stringify(content);
    //console.log(str)//figure out whats wrong in android stringnify
    let url = "http://3.104.232.106:8085/aicare-customer-api/customer/user/create-appointment?"+"scheduleDetailedId="+scheduleId+"&deptId="+doctype+"&customerRealName="+text+"&insuranceType="+type+"&cardHolderName="+content.name+"&expireDate="+content.date+"&serialNumber="+content.serial+"&cardNumber="+content.number+"&patientMobile="+content.mobile;//+"&content="+str;
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
            }})
            .then((response) => response.json())
            
            .then((json) => {
              if (json.code == 0) {
                Alert.alert("已预约成功")
                setModalVisible(!modalVisible)
                navigation.navigate("teleSuccess")
              } else {
                console.log(json.msg);
                //Alert.alert('预约失败');
              }
            }).catch(error => console.warn(error));
  }
  const goBack= () => {
    navigation.navigate("telehealthPay")
  }
  const gotoDate= () => {
    navigation.navigate("consumerDate")
  }
  const gotoCP= () => {
    sendRequest();
    

  }
  
  const gotoAddress= () => {
    navigation.navigate("consumerAddress")
  }
  const typename = (value) => {
    text => setText(text);
    state.action.changename(text);
  }
  return (
    <ScrollView style={{backgroundColor:"white"}}>
    <View style={{marginTop:-20}}></View>
    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:10,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {{    color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>联系方式</Text>
    </View>
    <View style={{marginLeft:-180,marginTop:30}}>
    <Image style = {styles.name_image}
        source= {require('../../images/icon/3/name.png')}
      />
    </View>

    <TextInput style = {{height: 35,
    marginLeft:5,
    marginTop:20,
    width: 250,
    borderBottomColor: '#999999',
    borderBottomWidth:1,
  }}defaultValue={content.name===""?null:content.name}
    placeholder='请输入患者联系电话'
    onChangeText={text => {setText(text);content.name=text}}
    />
    <View style={{marginLeft:-180,marginTop:10}}>
    <Image style = {styles.name_image}
        source= {require('../../images/icon/3/mobile.png')}
      />
    </View>
    <TextInput style = {{height: 35,
    marginLeft:5,
    marginTop:20,
    width: 250,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}} placeholder="请输入患者联系电话。"
    onChangeText={text1 => {setText1(text1);content.mobile=text}}
    />
    

    

    <View style={{marginLeft:-80,marginTop:50}}> 

    <TouchableOpacity style={styles.next_wrapper} onPress={() =>{setModalVisible(!modalVisible);console.log(doctype)}}>
      <Text style={styles.onsite_text}>提交预约</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={makecall}>
            <Image
                style={{width:60,height:60,borderRadius:30,bottom:-35,right:-300,marginBottom:40}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <View style={{marginTop:250,backgroundColor:"#F7FAFA",borderRadius:40,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,}}>
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() =>{setModalVisible(!modalVisible);
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          }} style={{marginRight:60,marginLeft:23}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    <Text style = {styles.service}>信息检对</Text>

    </View>
    <ScrollView style={{backgroundColor:"#F7FAFA"}}>
      <View style={{marginLeft:115,marginTop:30}}>
      <Text style={{marginBottom:10}}>患者姓名: {text}</Text>
      <Text style={{marginBottom:10}}>患者电话: {text1}</Text>
      <Text style={{marginBottom:10}}>就诊时间: {user.date} {startTime.slice(0,5)} - {endTime.slice(0,5)}</Text>
      <Text style={{marginBottom:10}}>就诊医生: {docName}</Text>
      <Text style={{marginBottom:10}}>就诊科目: {user.deptType[doctype]}</Text>
      <Text style={{marginBottom:10}}>就诊地址: {address}</Text>
      <Text style={{marginBottom:10}}>就诊方式: 实地会诊</Text>
      </View>


      <TouchableOpacity style={styles.next_wrapper} onPress={gotoCP}
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          >
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>
        </ScrollView>

        <View style={{height:20}}/>

        </View>
      </Modal>

    </View>
    <Image style = {styles.contact}
      source = {require('../../images/icon/1/contact.png')}
    />
  </View>
  </ScrollView>
  )}

