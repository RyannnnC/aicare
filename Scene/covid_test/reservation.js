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
export default function reservation({navigation,route}) {
  const user=useContext(DataContext);
  const [members,setMembers]=useState([]);
  const [first,setFirst]=useState("")
  const [last,setLast]=useState("")
  const [email,setEmial]=useState("")
  const [number,setNumber]=useState("")
  const [serial,setSerial]=useState("")
  const [expire,setExpire]=useState("")
  const [candidate,setCandidate]=useState({});
  const [modalVisible,setModalVisible]=useState(false);
  const [loading,setLoading]=useState(false)
 
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  //const { scheduleId,date,doctype,address,docName,startTime,endTime,teleFlg,Did,orgId} = route.params;
  const [gender,setGender]=useState("")
  const [id,setId]=useState(null);

  const [visible,setVisible]=useState(false)
  const [expVis,setExpVis]=useState(false)
  const [type,setType]=useState("")
  
  const [dob,setDob]=useState("")
  const gotoSuccess= () => {
    if (!checked4){
      Alert.alert(I18n.t("read_TOS"))
      return;
    }
    if (checked1){
      setType("Medicare")
      if(number.length<10){
        Alert.alert(I18n.t("fill_medicare"))
        return
      }
      if(serial.length==0){
        Alert.alert(I18n.t("fill_serial"))
        return
      }
    }else {
      setType("None") 
    }
    console.log(doctype);
    update()
    //navigation.navigate("teleConfirm",{orgId:orgId,mobile:candidate.mobile,Did:Did,id:id,teleFlg:teleFlg,content:content,scheduleId:scheduleId,type:type,date:date,doctype:doctype,address:address,docName:docName,startTime:startTime,endTime:endTime,dob:dob,serial:serial,number:number,first:candidate.firstName,last:candidate.lastName})
    setModalVisible(true);

  }  
  const gotoCP= () => {
    sendRequest();
  }
  const sendRequest=()=>{
    setLoading(true)

   
            let url = "http://"+user.url+"/aicare-customer-api/customer/pay/create_order";//+"&content="+str;
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
              scheduleDetailedId:scheduleId,
              serviceClass:1,
              insuranceType:type,
              videoChannel:teleFlg==1?0:1,
              currency:"AUD",
              price:4000,
              orgId:orgId,

              channel:"CardPayment",
              serviceType:teleFlg,
              customerUserInfoId:user.customerUserInfoId,
              chiefComplaintId:Did,
            })
          })
            .then((response) => response.json())
            .then((json) => {
              setLoading(false)
              if (json.code == 0) {
                setModalVisible(!modalVisible)
                console.log(json);
                if(json.ispay==1){
                  //navigation.navigate("telehealthPayment")
                  console.log(json.ispay)
                  Alert.alert(I18n.t("redirecting_pay")),
                  //Linking.openURL("wechat://")
                  //Linking.openURL(json.order_url)
                  navigation.navigate("pay",{url:json.order_url,orderId:json.partnerOrderId,docName:docName,startTime:startTime,endTime:endTime})
                  //NativeAppEventEmitter.addListener('alipay.mobile.securitypay.pay.onPaymentResult', onPaymentResult)

                }else{
                  //Alert.alert("预约成功")
                  navigation.navigate("teleSuccess",{docName:docName,doctype:1,startTime:"20:00",endTime:"20:30",teleFlg:0,mobile:"999",method:1})
                }
              } else {
                console.log(json.msg);
                console.log(json.ispay)

                Alert.alert(I18n.t("fail"));
              }
            }).catch(error => console.warn(error));      
  }
  const update=()=>{
    if(checked1){
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
      firstName:first,
      lastName:last,
      gender:gender,
      dob:dob,

      mobile: mobile,
      email: email,
      
      medicareCard:[
        {id:id,
        category: "Medicare",
        firstName: first,
        lastName: last,
        gender: gender,
        dateOfBirth: dob,
        expireDate:expire,
        number: number,
        serialNumber: serial}
      ]
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        //Alert.alert("信息保存成功")
        console.log(json.msg)

      } else {
        console.log(json.msg)
        Alert.alert(json.msg);
      }
    }).catch(error => console.warn(error));
  }else{
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
      firstName:first,
      lastName:last,
      mobile: mobile,
      email: email,
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.code === 0) {
        //Alert.alert("信息保存成功")
        console.log(json.msg)

      } else {
        console.log(json.msg)
        Alert.alert(json.msg);
      }
    }).catch(error => console.warn(error));
  }
  }


  const orders = members.length>0?members.map((item,index)=>{
    return(
        <TouchableOpacity style={{width:150,height:50,borderRadius:30,borderWidth:1,alignItems:"center",paddingTop:10,marginBottom:10}}
        onPress={()=>setId(item.id)}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}):null;
   const [center1,setCenter1]=React.useState(false);
   const [center2,setCenter2]= React.useState(false);
   const [center3,setCenter3]=React.useState(false);
  const [checked1, setChecked1] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(false);
  const [dropped,setdropped]=React.useState(false);
  const [mobile,setMobile]=React.useState("");
  const [des,setDes]=React.useState(user.des)
  const [airline,setAirline]=React.useState(user.air)
  const [dep,setDep]=React.useState(user.dep)
  const [book,setBook]=React.useState(user.book)
  const [center,setCenter]=React.useState("")
  const [company,setCompany]=React.useState(0)
  var content ={name:"",mobile:"",number:"",date:"",serial:"",first:"",last:"",gender:""};
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
        source={require('../../images/progress1.png')}
      />
    <View style={{marginTop:0,marginLeft:0}}>
    <Text style={{marginLeft:0,marginTop:20,fontSize:17,fontWeight:"500"}}>{"检测预约"}</Text>
    <Text style={{fontSize:16,marginLeft:0,marginTop:10}}>预约项目Test</Text>
    <Text style={{fontSize:14,marginLeft:0,marginTop:10}}>新冠病毒核酸检测</Text>
    <Text style={{fontSize:14,marginLeft:0}}>COVID-19 Real Time RT-PCR(NCP)</Text>

    </View>
    <View style={{marginTop:-15}}></View>
    <View style ={styles.comment_container}>
    
      <Text style={{fontSize:16,marginLeft:250}}>$150</Text>

    <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginTop:-14,marginLeft:10}}
            onPress={() => {
            setChecked1(!checked1);
         
            }}
          />
    </View>

    <Text style={{fontSize:14,marginLeft:0}}>新冠病毒血清特异性lgM抗体检测</Text>
    <View style={{marginTop:0,marginLeft:10,width:270}}>

    <Text style={{fontSize:14,marginLeft:0}}>COVID-19 Real Time lgM Antibody Test(NCM)</Text>
    </View>
    <View style={{marginTop:-20}}></View>
    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:250}}>$90</Text>
      <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginTop:-14,marginLeft:10}}
            onPress={() => {
        
            setChecked3(!checked3);
            }}
          />
    </View>
    
   
    <View style = {styles.container}>
      
        
    <View style={{flexDirection:"row",width:350,marginLeft:-20}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:10,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 本类新冠检测属于满足出入境许可要求，由官方认证医疗机构Healthpac Medical Center完成。如需回中国请双选预约项目，其他国家根据情况选择。</Text>
        </View>
    </View>
    <View style={{alignContent:"flex-start",marginLeft:35,marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>旅行目的地 Travel Destination</Text>

      <TextInput style = {{height: 35,
    width: 320,
    marginLeft:10,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    value={user.des}
          placeholder="请英文输入目的地国家"          onChangeText={(text)=>{setDes(text);user.action.changeDes(text)}}

      />

      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>乘坐航空公司 Airline</Text>

      <TextInput style = {{height: 35,
    width: 320,
    marginLeft:10,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    placeholder="请点击选择航空公司"
    editable={false}
    value={airline}

         onChangeText={(text)=>{setAirline(text);user.action.changeAir(text)}}

      />

<View style={{width:300,marginLeft:30,marginTop:10}}>
<View style={{flexDirection:"row"}}>
<CheckBox
    checked={company==1 }
    checkedColor='#FF8570'
    uncheckedIcon='circle-thin'
    checkedIcon='check-circle'
    size={30}
    containerStyle={{marginTop:-14,marginLeft:-20}}
    onPress={() => {
    setCompany(1)
    setAirline("厦门航空")

    }}
  />
<View>
<Text>厦门航空
        </Text>
</View>
</View>

<View style={{flexDirection:"row"}}>
<CheckBox
    checked={company==2}
    checkedColor='#FF8570'
    uncheckedIcon='circle-thin'
    checkedIcon='check-circle'
    size={30}
    containerStyle={{marginTop:-14,marginLeft:-20}}
    onPress={() => {
      setCompany(2)
      setAirline("南方航空") 
    }}
  />
<View>
<Text>南方航空
        </Text>
</View>
</View>

<View style={{flexDirection:"row"}}>
<CheckBox
    checked={company==3}
    checkedColor='#FF8570'
    uncheckedIcon='circle-thin'
    checkedIcon='check-circle'
    size={30}
    containerStyle={{marginTop:-14,marginLeft:-20}}
    onPress={() => {
      setCompany(3)
      setAirline("中国国际航空")  
    }}
  />
<View>
<Text>中国国际航空
        </Text>
</View>
</View>


</View>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>离航日期 Departure Date DD/MM/YYYY</Text>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10,color:"red"}}>(检测日期默认在离航日期提前两天)</Text>

      <TextInput style = {{height: 35,
    width: 320,
    marginLeft:10,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    maxLength={10} 
          placeholder="请输入离航日期 DD/MM/YYYY"
          value={user.dep}

          onChangeText={(text)=>{setDep(text);user.action.changeDep(text);}}

      />
      
<Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>预约日期 Booking Date DD/MM/YYYY</Text>

      <TextInput style = {{height: 35,
    width: 320,
    marginLeft:10,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    value={user.book}
    
          placeholder="请输入预约日期 DD/MM/YYYY"

          onChangeText={(text)=>{setBook(text);user.action.changeBook(text)}}

      />
      <View style={{flexDirection:"row"}}>

      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>检测机构 Test center</Text>


      </View>

      <TextInput style = {{height: 35,
    width: 320,
    marginLeft:10,
    marginTop:-10,
    borderBottomColor: '#999999',
    borderBottomWidth:1,
    }}
    value={center}
    editable={false}
          placeholder="点击下方选项"
         

      />
      
    
    <View style={{alignItems:"center",marginTop:15}}>

        <View style={{width:300}}>
        <View style={{flexDirection:"row"}}>
        <CheckBox
            checked={center1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginTop:-14,marginLeft:-20}}
            onPress={() => {
            setCenter1(true);
            setCenter2(false);
            setCenter3(false);
            setCenter("MediCentral CBD")

            }}
          />
        <View>
        <Text>MediCentral CBD
        </Text>
        <Text>Level 11, 501 George Street Sydney NSW 2000</Text>
        </View>
        </View>
        
        <View style={{flexDirection:"row"}}>
        <CheckBox
            checked={center2 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginTop:-14,marginLeft:-20}}
            onPress={() => {
                setCenter1(false);
                setCenter2(true);
                setCenter3(false);    
                setCenter("HealthPac - Chatswood")     
            }}
          />
        <View>
        <Text>HealthPac - Chatswood
        </Text>
        <Text>The Concourse, Shop 8/409 Victoria Ave, Chatswood NSW 2067</Text>
        </View>
        </View>
        
        <View style={{flexDirection:"row"}}>
        <CheckBox
            checked={center3}
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={30}
            containerStyle={{marginTop:-14,marginLeft:-20}}
            onPress={() => {
                setCenter1(false);
                setCenter2(false);
                setCenter3(true);
                setCenter("HealthPac - Hurstville");     

            }}
          />
        <View>
        <Text>HealthPac - Hurstville
        </Text>
        <Text>10 Park Rd, Hurstville NSW 2220</Text>
        </View>
        </View>
        

        </View>

        
    <View style={{width:350}}>
        <Text style={{marginLeft:0,marginTop:10}}>时间仅限周一至周五9:00 am - 14:00 pm。检测费用不可报销，报告结果将于检测完第二天通过电子邮件形式发送。</Text>
    </View>
    

    </View>
    <View style={{marginLeft:-40}}> 
    <View style={{marginTop:30}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {()=>{if(!checked1&&!checked3){Alert.alert("您还没有选任何项目哦。");return};
    if(des.length==0){Alert.alert("您还没输入目的地哦。");return};
    if(airline.length==0){Alert.alert("您还没输入航空公司哦。");return};
    if(dep.length==0){Alert.alert("您还没输入离航时间哦。");return};
    if(book.length==0){Alert.alert("您还没输入预约时间哦。");return};
    if(center.length==0){Alert.alert("您还没输入检测中心哦。");return};

    navigation.navigate("covid_info",{ncp:checked1,ncm:checked3,des:des,air:airline,dep:dep,book:book,center:center})}}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>{"下一步"}</Text>
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

