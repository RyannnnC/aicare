import React,{useContext,useState,useEffect} from 'react';
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,AsyncStorage} from 'react-native';
import {styles} from '../style';
import call from 'react-native-phone-call'
import { ScrollView } from 'react-native-gesture-handler';
import DataContext from "../consumerContext";
import I18n from "./language"
import moment from 'moment-timezone';
import * as Localization from 'expo-localization';
import * as Linking from 'expo-linking';

const  ConsumerIcon= ({navigation}) => {
  const [len,setLen]=useState(1)
  const goToOrder= () => {
    navigation.navigate('consumerOrder')
  }
  const goToTelehealth= () => {
    if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
            onPress:()=>removeToken()
        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthMain")
}
const checkToken=()=>{
  if (user.token==-1){
    return true
  }else{
    return false
  }
}
const removeToken=async() =>{
  try {
    await AsyncStorage.removeItem("token");
    //await AsyncStorage.removeItem("firsttime");

    console.log("Remove token success");
    user.action.clearstate()
  } catch (error) {
    console.log("Something went wrong", error);

  }
}
useEffect(() => {
  getting();
  
  
          //
          /**/
  },[])

  const getting=()=>{
   
          let url = "http://"+user.url+"/aicare-customer-api/customer/physicaltest/list";
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
              limit: 100,
              page: 1,
              
            
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.code === 0) {
              //Alert.alert("信息保存成功")
              console.log(json.msg)
              //Alert.alert(json.appointmentId)
              //navigation.navigate("covid_pay",{url:json.order_url,orderId:json.partnerOrderId})
              setContent(json.page.list)
            } else {
              console.log(json.msg)
              Alert.alert(json.msg);
            }
          }).catch(error => console.warn(error));
        
          

  }
  const goSomewhere=(index)=>{
    if(checkToken()){
      Alert.alert(
        I18n.t("login_notice"),
          I18n.t("login_notice_text"),
          [
            {text:I18n.t("cancel"),
              onPress:()=>console.log("cancel redirect"),
              style:"cancel"
          },{
            text:I18n.t("go_login"),
            onPress:()=>removeToken()
        }
        
      ]
      )
      return;
    }
    navigation.navigate("telehealthClinic",{return:"",type:true,doctype:index,state:"NSW"})
  }
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const alertHandler= () => {
    Alert.alert('功能将在下一版本更新，敬请期待')
  }
  const [content,setContent]=useState([])
  const query=[{"name":"HealthPac","date":"10/10/20","address":"17 joynton ave 2017","id":1},{"name":"HealthPac","date":"10/10/20","address":"17 joynton ave 2017","id":1}]
  const user = useContext(DataContext)
  const orders = content.map((item) => {
    //let date = moment(item.appointDate).tz(Localization.timezone).format('DD/MM/YYYY')
    //date = new Date(date.getDate()+1).toLocaleDateString();
    return (
      <View style={{
          width: 280,
          
          backgroundColor: '#F1F4F3',
          borderRadius: 15,
          marginTop:10,
          marginBottom:5,
       }} key={item.id}>
        <View style={{flexDirection: 'row', marginTop:16, marginBottom:16, marginLeft:25}}>
        <Image
          style = {{marginTop:5,width:45,height:45,borderRadius:20}}
          source={item.img?{uri:item.img}:require('../images/telehealth_icon/service_doctor_img1.png')}
        />
        <View>
          <View style={{flexDirection:"row"}}>
          <Text style={{fontSize:14, color:'#333333', fontWeight: '500',marginTop:5}}>{item.orgName}</Text>
        

          </View>
        <View style={{flexDirection:"row",width:300}}>
          <Text style={{ontSize:12, fontWeight: '400',marginLeft:0}}>{moment(item.appointDate).tz(Localization.timezone).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={{width:200}}>
          <Text style={{fontSize:10, fontWeight: '300',marginLeft:0}}>{item.ncp}</Text>
          <Text style={{fontSize:10, fontWeight: '300',marginLeft:0}}>{item.ncm}</Text>

          </View>

        </View>
        </View>

        <View style={{flexDirection: 'row-reverse',borderTopWidth:0.3,borderColor:"#999999"}}>
          
          <TouchableOpacity style={{

            height: 30,
            backgroundColor: '#68B0AB',//this.state.buttons[index].backgroundColor,
            borderRadius: 10,
            textAlign: 'center',
            marginRight: 25,
            marginTop: 3,
          }} 
          onPress={()=>Linking.openURL(item.pdf)}>
            <Text style={{fontSize:12, color:'#FAFAFA',paddingTop:6,paddingLeft:20,paddingRight:20}}>{"Download Attachment"}</Text>
          </TouchableOpacity>
          
          
        </View>
        <View style={{height:10}}></View>

      </View>
    )
  })
  return (
    <View style={{ flex:1,backgroundColor:"white"}}>

    <View style={{ backgroundColor: 'white',
    marginTop: 0,
    alignItems: 'center'}}>
    <View style={{height:80}}></View>
    <Image
      style = {styles.topping_image}
      source={require('../images/telehealth_icon/service_img.png')}
    />
    <View style={{marginTop:0}}></View>
    <Text style={{color:'#006A71',
    fontSize:17,
    marginTop:20,
    marginLeft:-85,}}>{"Examination Service"}</Text>
    <View style={{marginTop:0}}></View>
    {/* 
    <TouchableOpacity onPress = {goToTelehealth}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,
          }}
        source = {user.language=="en"?require("../images/large_c_booking_eng.png"):require('../images/large_d_booking.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:0}}></View>
    

    <TouchableOpacity onPress = {()=>Alert.alert(
      I18n.t("vaccine_notice"),
      "根据澳大利亚政府信息，目前(2021.6.8之后)澳大利亚疫苗阶段处于2a阶段，只有符合2a条件(40岁以上或关键高风险工作者)可以注射疫苗，诊所提供的疫苗类型为阿斯利康，请在预约之前自行核实自己是否符合标准。具体信息可在health.gov.au查看。点击确认继续疫苗预约。",
      [
        {
          text: I18n.t("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: I18n.t("confirm_cancel"), onPress :()=>   goSomewhere(7) } //this should navigate to the login page
      ],
      { cancelable: false }
      )}>
      <Image
        style = {{marginTop:25,
          height:120,
          width:290,
          marginLeft:30,}}
        source = {user.language=="en"?require("../images/bodycheck_long_eng.png"):require('../images/large_c_booking.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:0}}></View> */}
    <TouchableOpacity onPress={()=>navigation.navigate("reservation")} >
      <Image
        style = {{marginTop:15,
          height:115,
          width:290,
          marginLeft:10,
          }}
        source = {user.language=="en"?require("../images/covid_test_e.png"):require('../images/covid_test.png')}
      />
    </TouchableOpacity>
    <View style={{marginTop:0}}></View>
    <Text style={{color:'#006A71',
    fontSize:17,
    marginTop:10,
    marginLeft:-95,}}>{"Examination Result"}</Text>
    {len>0?<ScrollView height={360}><View style={{marginLeft:10}}>{orders}</View></ScrollView>:Null}
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{marginLeft:-75,marginTop:0,width:60,height:60,borderRadius:30,bottom:5,right:-170}}
                source = {require("../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    <View style={{marginTop:110}}></View>
    

    
  </View>
  </View>

  );
}
export default ConsumerIcon;