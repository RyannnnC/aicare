import React,{useState,useContext} from 'react';

  
import { Text, Button, View, Alert, Image,TouchableOpacity,Switch,TextInput,Modal,ActivityIndicator } from 'react-native';
import {styles} from '../../style';
import { StackActions } from '@react-navigation/native';
//import DataContext from '../consumerContext';
import { ScrollView, State } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import call from 'react-native-phone-call'
import DataContext from "../../consumerContext";
import { CheckBox } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { AUDIO_RECORDING } from 'expo-permissions';

const args = {
  number: '0403555432', // String value with the number to call
  prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default function Confirm({route,navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useContext(DataContext);
  const {orgId,mobile, Did,id,content,scheduleId,type,date,doctype,address,docName,startTime,endTime,teleFlg,dob,Date,serial,number,first,last} = route.params;
  const[method, setMethod] = useState("");//0 stands for facetime 1 stands for skype
  const [text, setText] = useState(first+last);
  const [text1, setText1] = useState('');
  const [loading,setLoading]=useState(false);
  const makecall=()=>{
    call(args).catch(console.error)
  }
  const[paymethod,setPaymethod]=useState("CardPayment")
  const sendRequest=()=>{
    setLoading(true)

    //let str = JSON.stringify(content);
    //console.log(str)//figure out whats wrong in android stringnify
    
    /*let url = "http://"+user.url+"/aicare-customer-api/customer/user/create-appointment?"+"scheduleDetailedId="+scheduleId+"&deptId="+doctype+"&customerRealName="+text+"&insuranceType="+type+"&cardHolderName="+text+"&expireDate="+Date+"&serialNumber="+serial+"&cardNumber="+number+"&patientMobile="+text1+"&telehealthFlg="+teleFlg+"&videoChannel="+method;//+"&content="+str;
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
              setLoading(false)

              if (json.code == 0) {
                Alert.alert("已预约成功")
                setModalVisible(!modalVisible)
                
                navigation.navigate("teleSuccess",{docName:docName,doctype:doctype,startTime:startTime,endTime:endTime,teleFlg:teleFlg,mobile:content.mobile,method:method})

              } else {
                console.log(json.msg);
                Alert.alert('预约失败,请重试或者联系客服。');
              }
            }).catch(error => console.warn(error));*/
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
              videoChannel:method,
              currency:"AUD",
              price:100,
              orgId:orgId,

              channel:paymethod,
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
                  Alert.alert("预约成功")
                  navigation.navigate("teleSuccess",{docName:docName,doctype:1,startTime:"20:00",endTime:"20:30",teleFlg:0,mobile:"999",method:1})
                }
              } else {
                console.log(json.msg);
                console.log(json.ispay)

                Alert.alert('预约失败,请重试或者联系客服。');
              }
            }).catch(error => console.warn(error));      
  }
  /*const onPaymentResult = (result) => {
    //console.log(`result -> `)
    //console.log(result)
    console.log(`result.resultStatus = ${result.resultStatus}`)
    console.log(`result.memo = ${result.memo}`)
    console.log(`result.result = ${result.result}`)
    Alert.alert(
        '',
        `${result.resultStatus == 9000 ? '支付成功' : '支付失败'} `
    )
}*/
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
    <View style={{marginTop:40}}></View>
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
    marginLeft:40,}}>信息核对</Text>
    </View>
    

    

    {teleFlg==2?<View style={{marginLeft:-43,marginTop:10}}>
    <Image style = {{height:23,width:15,marginTop:15,marginBottom:-5,marginLeft:45}}
        source= {require('../../images/telehealth_icon/order_confirm_icon_means.png')}
      /><Text style={{marginLeft:70,fontSize:16,marginTop:-17}}>远程方式</Text>
    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:45}}>FaceTime(支持苹果)</Text>
      <CheckBox
            checked={method==1}
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:8}}
            onPress={() => {
              setMethod(1)
            }}
          />
    </View>
    <View style ={{flexDirection:"row",marginTop:10}}>
      <Text style={{fontSize:16,marginLeft:45}}>Skype(支持安卓)</Text>
      <CheckBox
            checked={method==2}
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:36}}
            onPress={() => {
              setMethod(2)
            }}
          />
    </View>
    </View>:null}
    {/*teleFlg==1 && type!="Medicare"?<View style={{marginLeft:-43,marginTop:0}}>
    <Image style = {{height:23,width:15,marginTop:15,marginBottom:-5,marginLeft:45}}
        source= {require('../../images/telehealth_icon/order_confirm_icon_means.png')}
      /><Text style={{marginLeft:70,fontSize:16,marginTop:-17}}>支付方式</Text>
    <View style ={styles.comment_container}>
      <Text style={{fontSize:16,marginLeft:45}}>卡支付</Text>
      <CheckBox
            checked={paymethod=="CardPayment"}
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:8}}
            onPress={() => {
              setPaymethod("CardPayment")
            }}
          />
    </View>
    <View style ={{flexDirection:"row",marginTop:10}}>
      <Text style={{fontSize:16,marginLeft:45}}>支付宝</Text>
      <CheckBox
            checked={paymethod=="Alipay"}
            checkedColor='#FF8570'
            uncheckedIcon='circle-thin'
            checkedIcon='check-circle'
            size={33}
            containerStyle={{marginTop:-14,marginLeft:36}}
            onPress={() => {
              setPaymethod("Alipay")
            }}
          />
    </View>
          </View>:null*/}
    

    

    <View style={{marginLeft:-80,marginTop:40}}> 

    <TouchableOpacity style={styles.next_wrapper} onPress={() =>{
      setModalVisible(!modalVisible);console.log(doctype)}}>
      <Text style={styles.onsite_text}>提交预约</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>user.action.contact()}>
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
      <Text style={{marginBottom:10}}>患者电话: {mobile}</Text>
      <Text style={{marginBottom:10}}>就诊时间: {user.date} {startTime.slice(0,5)} - {endTime.slice(0,5)}</Text>
      <Text style={{marginBottom:10}}>就诊医生: {docName}</Text>
      <Text style={{marginBottom:10}}>就诊科目: {doctype?user.deptType[doctype]:"全科问诊"}</Text>
      {teleFlg==1?<Text style={{marginBottom:10}}>就诊地址: {address}</Text>:null}
      <Text style={{marginBottom:10}}>就诊方式: {teleFlg==2?"远程就诊":"实地会诊"}</Text>
      {teleFlg==2?<View>
      <Text style={{marginBottom:10}}>远程方式: {method!=""?method==1?"FaceTime(苹果)":"Skype(安卓)":null}</Text>
      
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

    </View>
   
  </View>
  </ScrollView>
  )}

