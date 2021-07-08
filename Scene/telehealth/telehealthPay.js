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
//import { isNullishCoalesce } from 'typescript';


const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}
//import { Checkbox } from 'react-native-paper/lib/typescript/components/Checkbox/Checkbox';
//mport { grey100 } from 'react-native-paper/lib/typescript/styles/colors';
export default function TelePay({navigation,route}) {
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
  useEffect(() => {
    

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
          setCandidate(json.medicalInfo);
          setFirst(json.medicalInfo.firstName)
          setLast(json.medicalInfo.lastName)
          setMobile(json.medicalInfo.mobile)
          setEmial(json.medicalInfo.email)
          
          setDob(json.medicalInfo.dob)
          if(json.medicalInfo.medicareCard[0]){
           setId(json.medicalInfo.medicareCard[0].id) 
          }
          if(json.medicalInfo.medicareCard&&json.medicalInfo.medicareCard[0]){
          setExpire(json.medicalInfo.medicareCard[0].expireDate)
          }
          
          
          if(json.medicalInfo.medicareCard&&json.medicalInfo.medicareCard[0]){
            setNumber(json.medicalInfo.medicareCard[0].number)
            }
          if(json.medicalInfo.medicareCard&&json.medicalInfo.medicareCard[0]){
            setSerial(json.medicalInfo.medicareCard[0].serialNumber)
          }
          
          setGender(json.medicalInfo.gender)
          
          
          console.log(json.medicalInfo.medicareCard[0])
          //this.setState({press:new Array(members.length).fill(true)})
          //console.log(candidate.medicareCard);
        } else {
          console.log(json.msg)
          Alert.alert(json.msg);
        }
      }).catch(error => console.warn(error));
    /*let poll = setInterval(() => {
      getting();
    }, 5000);
    setRec(poll);
    return()=>clearInterval(poll)
    */
            //
            /**/
    },[])
  const goBack= () => {
    navigation.dispatch(StackActions.pop(1))
  }
  const { scheduleId,date,doctype,address,docName,startTime,endTime,teleFlg,Did,orgId} = route.params;
  const [gender,setGender]=useState("")
  const [id,setId]=useState(null);

  const [visible,setVisible]=useState(false)
  const [expVis,setExpVis]=useState(false)
  const [type,setType]=useState("")
  
  const [dob,setDob]=useState("")
  const gotoSuccess= () => {
    if (!checked4){
      Alert.alert("您需要阅读并同意用户须知。")
      return;
    }
    if (checked1){
      setType("Medicare")
      if(number.length<10){
        Alert.alert("Medicare卡号位数为10位")
        return
      }
      if(serial.length==0){
        Alert.alert("请输入序列号")
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
              price:100,
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
                  Alert.alert("正在跳转支付"),
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

                Alert.alert('预约失败,请重试或者联系客服。');
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
/*
  const sendRequest=()=>{
    console.log(content);
    //console.log(date)
    //this.context.action.changeLoading(true);
    //http://3.104.87.14:8085/aicare-customer-api/customer/customer-info/medicare-verification

    let url = "http://"+user.url+"/aicare-customer-api/customer/customer-info/medicare-verification";
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
      "type": "Verify:Medicare",
      "patient": {
        "dateOfBirth": content.dob,
        "medicare": {
          "number": content.number,
          "ref": content.serial
        },
        "gender": content.gender,
        "name": {
          "first": content.first,
          "family": content.last,
        }
      }
    })
    })
            .then((response) => response.json())
            .then((json) => {
              if (json.code == 0) {
                if(json.verification.status.medicare.code===0){
                Alert.alert('医保卡验证成功');
                gotoSuccess();
              } else {
                console.log(json.verification.status);
                Alert.alert('抱歉，您的医保卡验证失败，请重新验证或咨询客服，客服按钮在页面右下角。');
              }}else{
                console.log(json.code);
                Alert.alert('抱歉，服务器报错了，请联系客服，按钮在页面右下角。');
              }
            }).catch(error => console.warn(error));
  }*/

  const orders = members.length>0?members.map((item,index)=>{
    return(
        <TouchableOpacity style={{width:150,height:50,borderRadius:30,borderWidth:1,alignItems:"center",paddingTop:10,marginBottom:10}}
        onPress={()=>setId(item.id)}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}):null;
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [mobile,setMobile]=React.useState("");
  var content ={name:"",mobile:"",number:"",date:"",serial:"",first:"",last:"",gender:""};
  return (

    <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:"white"}} style={{backgroundColor:"white"}} enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    >

    <View style={styles.container}>
    <View style={{flexDirection:'row',marginTop:45,marginLeft:-140}}>
    <TouchableOpacity onPress = {goBack} style={{marginRight:60}}>
      <Image
        style = {styles.arrow_image}
        source={require('../../images/icon/2/Arrow_left.png')}
      />
    </TouchableOpacity>
    
    <Text style = {{    color:'black',
    fontSize:17,
    marginTop:20,
    marginLeft:40,}}>费用报销</Text>
    </View>
    <View style={{marginTop:30,marginLeft:-170}}>
    <Text style={{marginLeft:100,marginTop:40,fontSize:17,fontWeight:"500"}}>患者是否拥有Medicare卡?</Text>
    </View>
    <View style={{marginTop:-5}}></View>
    <View style ={styles.comment_container}>
    
      <Text style={{fontSize:16,marginLeft:-10}}>我有Medicare卡</Text>

    <CheckBox
            checked={checked1 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:100}}
            onPress={() => {
            setChecked1(!checked1);
            setChecked2(false);
            setChecked3(false);
            }}
          />
    </View>
    <View style={{marginTop:-20}}></View>
    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:-10}}>我没有Medicare卡</Text>
      <CheckBox
            checked={checked3 }
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:80}}
            onPress={() => {
            setChecked1(false);
            setChecked2(false);
            setChecked3(!checked3);
            }}
          />
    </View>
    
    {checked1?<View style = {styles.container}>
        <View style={{marginTop:-15}}></View>
        
        <Image
        style = {{height:125,width:375}}
        source={require('../../images/telehealth_icon/service_order_img_card.png')}
      />
      <View style={{flexDirection:"row",marginTop:15}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:0,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999",}}> 持有medicare的用户在支持bulk billing</Text>
        </View>
        <Text style={{color:"#999999",marginLeft:-90,marginBottom:5}}> 的诊所看诊可全额报销。</Text>
        <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:10,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 所有医保卡信息(例如姓名，出生日期等)</Text>
        </View>
        <Text style={{color:"#999999",marginLeft:-125,marginBottom:0}}> 仅用于医保卡验证。</Text>


        <View style={{flexDirection:"row",marginTop:10}}>
        <Text style={{marginTop:7,fontWeight:"500"}}>持卡人姓:</Text>
        <TextInput style = {{height: 35,
    width: 200,
    borderBottomColor: '#999999',
    marginLeft:0,
    borderBottomWidth:1,}}
          
          onChangeText={(text)=>setLast(text)}
          defaultValue={last}
          placeholder="持卡人姓(Last Name)"
        />
        </View>
        <View style={{flexDirection:"row",marginTop:10}}>
        <Text style={{marginTop:7,fontWeight:"500"}}>持卡人名:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:0,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="持卡人名(First Name)"
          onChangeText={(text)=>setFirst(text)}
          defaultValue={first}

      />
      </View>
      
      <DateTimePickerModal
        display="spinner"
        isVisible={visible}
        mode="date"
        headerTextIOS='出生日期'
        cancelTextIOS="取消"
        confirmTextIOS='确认'
        onConfirm={(time)=>{setDob(moment(time).tz(Localization.timezone).format('DD/MM/YYYY'));setVisible(false);console.log(dob)}}
        onCancel={()=>setVisible(false)}
        
      />
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:-48}}>出生日期:</Text>

      {/*<TextInput style = {{height: 35,
        width: 200,
        marginLeft:0,
        borderBottomColor: '#999999',
        borderBottomWidth:1,}}
              placeholder="出生日期(DOB) dd-mm-yyyy"
              onChangeText={(text)=>content.dob=text}
    
          />*/}
          <TouchableOpacity style={{borderColor:"#8FD7D3",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:0,
    height:35,

    marginLeft:30,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>setVisible(true)}>
      <Text style={{fontSize:12}}>{dob}</Text>
    </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",marginTop:10}}>
        <Text style={{marginTop:7,fontWeight:"500"}}>性别:</Text>
        <SwitchSelector
  initial={gender=="M"?1:0}
  onPress={value => {setGender(value);}}
  buttonColor='#8FD7D3'
  borderColor='#8FD7D3'
  hasPadding
  style={{width:200,marginLeft:30}}
  height={35}
  initial={gender=="M"?1:0}
  options={[
    { label: "女性", value: "F",  }, 
    { label: "男性", value: "M", } 
  ]}
  testID="gender-switch-selector"
  accessibilityLabel="gender-switch-selector"
/>
        
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500"}}>医疗卡号:</Text>

        <TextInput style = {{height: 35,
    width: 200,
    marginLeft:0,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
        maxLength={10} 
          placeholder="请输入10位卡号"
          onChangeText={(text)=>setNumber(text)}
          defaultValue={number}
      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500"}}>序列号:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:15,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    maxLength={5} 
          placeholder="请输入序列号(Ref Number)"
          onChangeText={(text)=>setSerial(text)}
          defaultValue={serial}

      />
      </View>
      <DateTimePickerModal
        isVisible={expVis}
        mode="date"
        headerTextIOS='到期日期'
        cancelTextIOS="取消"
        display="spinner"
        confirmTextIOS='确认'
        onConfirm={(time)=>{setExpire(moment(time).tz(Localization.timezone).format('MM/YYYY'));setExpVis(false);console.log(expire)}}
        onCancel={()=>setExpVis(false)}
      />
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:-47}}>到期日期:</Text>
  
      <TouchableOpacity style={{borderColor:"#8FD7D3",
      borderWidth:1,
    padding:8,
    width:120,
    marginTop:0,
    height:35,

    marginLeft:30,
    alignItems: 'center',
    borderRadius:25,}} onPress={()=>setExpVis(true)}>
      <Text style={{fontSize:12}}>{expire}</Text>
    </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>手机号码:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    maxLength={10} 
          placeholder="手机号码(Mobile Number)"
          onChangeText={(text)=>setMobile(text)}
        defaultValue={mobile}
      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>电子邮箱:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    
          placeholder="电子邮箱(Email)"
          onChangeText={(text)=>setEmial(text)}
        defaultValue={email}
      />
      </View>
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:60}}></View>
    <View style={{flexDirection:"row"}}>
    <CheckBox
            checked={checked4 }
            checkedColor='#FF8570'
            uncheckedIcon='square-o'
            checkedIcon='check-square-o'
            size={23}
            containerStyle={{marginTop:-52,marginLeft:110}}
            onPress={() => {
            setChecked4(!checked4);
            }}
          />
    <Text style={{marginTop:-40,marginLeft:-20}}>我确认我有完整并正确的填写信息。</Text>
    </View>
    <View>
    <Text style={{marginLeft:120,marginTop:-15}}>I certify that I have completed this form completely and accurately to the best of my knowledge.</Text>
    <Text style={{marginLeft:120,marginTop:5}}>By proceeding I consent to the handling of my personal information as described in the </Text>
    <TouchableOpacity onPress={()=>navigation.navigate("termofuse")}>
    <Text style={{marginLeft:120,marginTop:5,color:"#8FD7D3"}}>Collection Notice,</Text>
    </TouchableOpacity>
    <Text style={{marginLeft:120,marginTop:5}}>and agree to the Aicare's</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('数据协议')}>
    <Text style={{marginLeft:120,marginTop:5,color:"#8FD7D3"}}>Term of Use and Privacy Policy.</Text>
    </TouchableOpacity>
    

    </View>
    <View style={{marginLeft:80}}>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>信息核对</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>: null}
    {/*checked2?<View style = {styles.container}>
        <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:0,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 若持有私人保险，您可以按照正常程序</Text>
        </View>
        <Text style={{color:"#999999",marginLeft:-55,marginBottom:20}}> 向您的医保卡公司申请报销。</Text>
        <View style={{flexDirection:"row",marginTop:0}}>
      <Text style={{marginTop:7,fontWeight:"500"}}>持险人姓:</Text> 
      <TextInput style = {{height: 35,
    width: 200,
    borderBottomColor: '#999999',
    marginLeft:0,
    borderBottomWidth:1,}}
          placeholder="保险人姓"
          onChangeText={(text)=>content.first=text}

      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500"}}>持险人名:</Text> 
      <TextInput style = {{height: 35,
    width: 200,
    borderBottomColor: '#999999',
    marginLeft:0,
    borderBottomWidth:1,}}
          placeholder="保险人名"
          onChangeText={(text)=>content.last=text}

      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500"}}>保险号码:</Text> 
      <TextInput style = {{height: 35,
    width: 200,
    borderBottomColor: '#999999',
    marginLeft:0,
    borderBottomWidth:1,}}
          placeholder="保险号码(Policy Number)"
          onChangeText={(text)=>content.number=text}
      />
      </View>
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:50}}></View>
    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      <Text style={styles.onsite_text}>下一步</Text>
    </TouchableOpacity>
    </View>
    </View>: null*/}
    {checked3?<View style = {styles.container}>
      
        
    <View style={{flexDirection:"row"}}>
        <Image style = {{width:20,
        height:20,
        marginTop:2,
        marginLeft:10,}}
        source= {require('../../images/telehealth_icon/service_icon_info.png')}/>
        <Text style={{color:"#999999"}}> 若未持有Medicare卡，就诊费用需要自费。</Text>
        </View>
        
        <View style={{flexDirection:"row",marginTop:30}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>患者姓:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="患者姓名(Patient Name)"
          defaultValue={last}          onChangeText={(text)=>setLast(text)}

      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>患者名:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="患者姓名(Patient Name)"
          defaultValue={first}          onChangeText={(text)=>setFirst(text)}

      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>手机号码:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
    maxLength={10} 
          placeholder="手机号码(Mobile Number)"
          defaultValue={mobile}
          onChangeText={(text)=>setMobile(text)}

      />
      </View>
      <View style={{flexDirection:"row",marginTop:10}}>
      <Text style={{marginTop:7,fontWeight:"500",marginLeft:10}}>电子邮箱:</Text>

      <TextInput style = {{height: 35,
    width: 200,
    marginLeft:5,
    borderBottomColor: '#999999',
    borderBottomWidth:1,}}
          placeholder="手机号码(Mobile Number)"
          defaultValue={email}
          onChangeText={(text)=>setEmial(text)}

      />
      </View>
      <View style={{marginTop:60}}></View>
    <View style={{flexDirection:"row"}}>
    <CheckBox
            checked={checked4 }
            checkedColor='#FF8570'
            uncheckedIcon='square-o'
            checkedIcon='check-square-o'
            size={23}
            containerStyle={{marginTop:-52,marginLeft:-25}}
            onPress={() => {
            setChecked4(!checked4);
            }}
          />
    <Text style={{marginTop:-40,marginLeft:-20}}>我确认我有完整并正确的填写信息。</Text>
    </View>
    <View>
    <Text style={{marginLeft:40,marginTop:-15}}>I certify that I have completed this form completely and accurately to the best of my knowledge.</Text>
    <Text style={{marginLeft:40,marginTop:5}}>By proceeding I consent to the handling of my personal information as described in the </Text>
    <TouchableOpacity onPress={()=>navigation.navigate("termofuse")}>
    <Text style={{marginLeft:40,marginTop:5,color:"#8FD7D3"}}>Collection Notice,</Text>
    </TouchableOpacity>
    <Text style={{marginLeft:40,marginTop:5}}>and agree to the Aicare's</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('数据协议')}>
    <Text style={{marginLeft:40,marginTop:5,color:"#8FD7D3"}}>Term of Use and Privacy Policy.</Text>
    </TouchableOpacity>
    

    </View>
    <View style={{marginLeft:-80}}> 
    <View style={{marginTop:30}}></View>

    <TouchableOpacity style={styles.next_wrapper} onPress = {gotoSuccess}>
      {/*this need to manually calculated */}
      <Text style={styles.onsite_text}>{"信息核对"}</Text>
    </TouchableOpacity>
    </View>
    </View>: null}
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
      <Text style={{marginBottom:10}}>患者姓名: {first + " "+ last}</Text>
      <Text style={{marginBottom:10}}>患者电话: {mobile}</Text>
      <Text style={{marginBottom:10}}>就诊时间: {user.date} {startTime.slice(0,5)} - {endTime.slice(0,5)}</Text>
      <Text style={{marginBottom:10}}>就诊医生: {docName}</Text>
      <Text style={{marginBottom:10}}>就诊科目: {doctype?user.deptType[doctype]:"全科问诊"}</Text>
      {teleFlg==1?<Text style={{marginBottom:10}}>就诊地址: {address}</Text>:null}
      <Text style={{marginBottom:10}}>就诊方式: {teleFlg==2?"远程就诊":"实地会诊"}</Text>
      {teleFlg==2?<View>
      <Text style={{marginBottom:10}}>远程方式: {"FaceTime(苹果)"}</Text>
      
      </View>:null}
      {loading?
      <ActivityIndicator size="large" style={{marginTop:20}} color="#00FF00"></ActivityIndicator>:null
      }
      </View>

      {!loading?
      <TouchableOpacity style={styles.next_wrapper} onPress={gotoCP}
            //state.action.changetotal(Number(state.end_time.substring(0,2))-Number(state.start_time.substring(0,2))+(Number(state.end_time.substring(3,5))-Number(state.start_time.substring(3,5)))/60);
            //this.props.navigation.dispatch(StackActions.pop(1))}
          >
          <Text style={styles.onsite_text}>确定</Text>
        </TouchableOpacity>:null}
        </ScrollView>

        <View style={{height:20}}/>

        </View>
      </Modal>
    <TouchableOpacity onPress={()=>user.action.contact()}>
            <Image
                style={{width:60,height:60,borderRadius:20,marginBottom:20,marginLeft:280,marginTop:50}}
                source = {require("../../images/mobile_icon.png")}
            />
    </TouchableOpacity>
    
    
  
  </View>
  
  </KeyboardAwareScrollView>

  )}

